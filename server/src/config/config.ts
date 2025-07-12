// Centralized configuration for environment variables and constants
import { getEnvVar, getEnvVarWithDefault } from '@/utils/environment';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
// (This should only be called once, ideally in the entry point)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Environment detection
const NODE_ENV = getEnvVarWithDefault('NODE_ENV', 'development');
const isDevelopment = NODE_ENV === 'development';
const isProduction = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test';
const appName = getEnvVarWithDefault('APP_NAME', 'default-app-name');
const appVersion = getEnvVarWithDefault('APP_VERSION', '0.0.1');

export const config = {
  // Environment
  NODE_ENV,
  isDevelopment,
  isProduction,
  isTest,
  appName,
  appVersion,

  // Server
  PORT: getEnvVarWithDefault('PORT', '5001'),
  HOST: getEnvVarWithDefault('HOST', 'localhost'),

  // Database
  MONGODB_URI: getEnvVar('MONGODB_URI'),

  // Logging Configuration
  logging: {
    // Development: Verbose console logging only
    development: {
      level: 'debug',
      console: true,
      file: false,
      format: 'colored',
      includeStack: true,
      includeTimestamp: true,
    },

    // Production: Structured logging to files only
    production: {
      level: 'warn', // Only warnings and errors in production
      console: false, // No console output in production
      file: true,
      format: 'json',
      includeStack: false, // No stack traces in production logs
      includeTimestamp: true,
      logRotation: {
        maxSize: 10 * 1024 * 1024, // 10MB
        maxFiles: 10,
        compress: true,
      },
    },

    // Test: Silent logging with console transport to avoid warnings
    test: {
      level: 'error',
      console: true,
      file: false,
      format: 'json',
      includeStack: false,
      includeTimestamp: false,
    },
  },

  // Security
  cors: {
    origin: getEnvVarWithDefault('CORS_ORIGIN', 'http://localhost:3000'),
    credentials: true,
  },

  // Rate Limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: isProduction ? 100 : 1000, // Stricter in production
  },

  // API Configuration
  api: {
    version: 'v1',
    prefix: '/api',
    timeout: 30000, // 30 seconds
  },

  // Error Handling
  errorHandling: {
    showStack: isDevelopment,
    logErrors: true,
    logRequests: isDevelopment,
  },
};
