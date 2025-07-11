/**
 * Express application setup (Refactored)
 *
 * Key Improvements:
 * - Simplified middleware logging
 * - Better request context handling
 * - Optimized error handling integration
 * - Cleaner health check endpoint
 */

import express from 'express';
import { config } from './config/config';
import { errorHandler, requestLogger, notFoundHandler } from './middlewares/error-handler';
import routes from './routes';
import { limiter } from './middlewares/rate-limiter';
import { corsMiddleware } from './middlewares/cors';
import { compressionMiddleware } from './middlewares/compression';
import { bodyParserMiddleware, urlencodedMiddleware } from './middlewares/body-parser';
import { helmetMiddleware } from './middlewares/helmet';
import { sanitizeXSS, sanitizeMongoDB } from './middlewares/sanitization';

const app = express();

// Security middleware (now imported from helmet.ts)
app.use(helmetMiddleware());

// CORS configuration
app.use(corsMiddleware);

// Rate limiting
app.use(config.api.prefix, limiter);

// Compression middleware
app.use(compressionMiddleware);

// Body parsing middleware
app.use(bodyParserMiddleware);

// URL encoded middleware
app.use(urlencodedMiddleware);

// Add sanitization middleware
app.use(sanitizeXSS);
app.use(sanitizeMongoDB);

// Request logging (now more efficient)
app.use(requestLogger);

// API routes
app.use(config.api.prefix, routes);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

export default app;
