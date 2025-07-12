/**
 * Enterprise Error Handling (Refactored)
 *
 * Key Improvements:
 * - Simplified error classification
 * - Consolidated logging
 * - Better request context handling
 * - Optimized error response formatting
 */

import { NextFunction, Request, Response } from 'express';
import { config } from '../config/config';
import { enterpriseLogger } from '../utils/logger';

// Request context interface
interface RequestWithContext extends Request {
  context?: {
    requestId: string;
    ip: string;
    userAgent: string | undefined;
  };
}

// Custom Error Classes
export class BusinessError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400,
    public isOperational: boolean = true,
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends BusinessError {
  constructor(
    message: string,
    public field: string,
  ) {
    super(message, 400);
  }
}

export class AuthenticationError extends BusinessError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
  }
}

export class AuthorizationError extends BusinessError {
  constructor(message: string = 'Access denied') {
    super(message, 403);
  }
}

export class NotFoundError extends BusinessError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

// Error Response Interface
interface ErrorResponse {
  error: string;
  message: string;
  timestamp: string;
  path?: string;
  [key: string]: unknown;
}

// Determine HTTP status code
const getStatusCode = (error: Error): number => {
  if (error instanceof BusinessError) return error.statusCode;

  switch (error.name) {
    case 'ValidationError':
    case 'CastError':
      return 400;
    case 'JsonWebTokenError':
    case 'TokenExpiredError':
      return 401;
    case 'MongoError':
      return 500;
    default:
      return 500;
  }
};

// Create error response
const createErrorResponse = (error: Error, req: Request): ErrorResponse => {
  const response: ErrorResponse = {
    error: error.name || 'InternalServerError',
    message:
      config.isProduction && !(error instanceof BusinessError)
        ? 'Something went wrong'
        : error.message,
    timestamp: new Date().toISOString(),
    path: req.path,
  };

  if (config.isDevelopment) {
    response.stack = error.stack;
    if (error instanceof ValidationError) {
      response.field = error.field;
    }
  }

  return response;
};

// Main error handler middleware
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const statusCode = getStatusCode(error);

  // Log the error
  const logContext = {
    statusCode,
    path: req.path,
    method: req.method,
    ...(req as RequestWithContext).context, // Attached by requestLogger
  };

  if (statusCode >= 500) {
    enterpriseLogger.error(error.message, {
      ...logContext,
      stack: error.stack,
    });
  } else if (statusCode >= 400) {
    enterpriseLogger.warn(error.message, logContext);
  }

  // Send response
  res.status(statusCode).json(createErrorResponse(error, req));
};

// Async handler wrapper
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Request logging middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  if (!config.errorHandling.logRequests) return next();

  const start = Date.now();
  const requestId = `req-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  // Attach context to request
  (req as RequestWithContext).context = {
    requestId,
    ip: req.ip ?? '',
    userAgent: req.get('User-Agent') || '',
  };

  res.on('finish', () => {
    const duration = Date.now() - start;
    enterpriseLogger.info(`${req.method} ${req.url}`, {
      status: res.statusCode,
      duration,
      ...(req as RequestWithContext).context,
    });
  });

  next();
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  next(new NotFoundError(`Route ${req.method} ${req.url} not found`));
};

// Graceful shutdown handler
export const gracefulShutdown = (server: import('http').Server, signal: string): void => {
  enterpriseLogger.info(`Shutdown initiated`, { signal });

  const shutdownTimer = setTimeout(() => {
    enterpriseLogger.error('Forcing shutdown after timeout');
    process.exit(1);
  }, 30000);

  server.close(() => {
    clearTimeout(shutdownTimer);
    enterpriseLogger.info('Server closed');
    process.exit(0);
  });
};
