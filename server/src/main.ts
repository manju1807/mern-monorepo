/**
 * Application Entry Point
 *
 * Features:
 * - Clean startup/shutdown logging
 * - Semantic error handling
 * - Environment-aware output
 * - Structured production logs
 */

import app from './app';
import { enterpriseLogger } from './utils/logger';
import { config } from './config/config';
import { gracefulShutdown } from './middlewares/error-handler';
import mongoose from 'mongoose';

// Constants
const PORT = config.PORT || 3000;
const HOST = config.HOST || '0.0.0.0';
const SHUTDOWN_TIMEOUT = 30000;

// Database Connection
const connectDatabase = async (): Promise<void> => {
  if (!config.MONGODB_URI) {
    enterpriseLogger.failure('Database configuration missing');
    process.exit(1);
  }

  try {
    await mongoose.connect(config.MONGODB_URI);
    enterpriseLogger.success('✅ Database connection successful!');

    // Log connection details in development
    if (config.isDevelopment) {
      enterpriseLogger.debug('🔗 Database connection details', {
        host: mongoose.connection.host,
        name: mongoose.connection.name,
        readyState: mongoose.connection.readyState,
      });
    }
  } catch (error) {
    enterpriseLogger.failure('❌ Database connection failed', {
      error: (error as Error).message,
      ...(config.isDevelopment && { stack: (error as Error).stack }),
    });
    process.exit(1);
  }
};

// Health Monitoring
const initializeHealthChecks = () => {
  if (!config.isProduction) return;

  setInterval(
    () => {
      const status = mongoose.connection.readyState === 1 ? 'healthy' : 'unhealthy';
      enterpriseLogger.info('System health check', {
        status,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        dbStatus: mongoose.connection.readyState,
      });
    },
    5 * 60 * 1000,
  ); // Every 5 minutes
};

// Server Initialization
const initializeServer = (): void => {
  const server = app.listen(Number(PORT), HOST, () => {
    enterpriseLogger.success(`Server listening on http://${HOST}:${PORT}`);
    // Development-only debug info
    if (config.isDevelopment) {
      enterpriseLogger.debug('Server initialization complete', {
        environment: config.NODE_ENV,
        nodeVersion: process.version,
        platform: process.platform,
      });
    }
  });

  // Error Handling
  server.on('error', (error: Error) => {
    enterpriseLogger.failure('Server crashed', {
      error: error.message,
      ...(config.isDevelopment && { stack: error.stack }),
    });
    process.exit(1);
  });

  // Shutdown Handling
  const shutdownSignals: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

  shutdownSignals.forEach((signal) => {
    process.on(signal, () => {
      enterpriseLogger.shutdown(`Received ${signal} signal`);
      gracefulShutdown(server, signal);
    });
  });

  // Uncaught Exceptions
  process.on('uncaughtException', (error: Error) => {
    enterpriseLogger.failure('Uncaught exception', {
      error: error.message,
      stack: error.stack,
    });
    gracefulShutdown(server, 'uncaughtException');
  });

  // Unhandled Rejection
  process.on('unhandledRejection', (reason: unknown) => {
    enterpriseLogger.failure('Unhandled rejection', {
      reason: reason instanceof Error ? reason.message : String(reason),
    });
    gracefulShutdown(server, 'unhandledRejection');
  });
};

// Main Application Startup
const startup = async (): Promise<void> => {
  try {
    // Phase 1: Initialization
    enterpriseLogger.startup(`Launching ${config.appName} v${config.appVersion}`);

    // Phase 2: Database Connection
    await connectDatabase();

    // Phase 3: Health Monitoring
    initializeHealthChecks();

    // Phase 4: Server Startup
    initializeServer();

    enterpriseLogger.success('Application startup completed successfully');
  } catch (error) {
    enterpriseLogger.failure('Fatal startup error', {
      error: (error as Error).message,
      ...(config.isDevelopment && { stack: (error as Error).stack }),
    });
    process.exit(1);
  }
};

// Start the Application
startup();
