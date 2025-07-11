/**
 * Enterprise-level logging system (Enhanced)
 *
 * Key Features:
 * - Beautiful, colored output for development
 * - Structured JSON for production
 * - Smart metadata handling
 * - Environment-aware formatting
 */

import winston from 'winston';
import path from 'path';
import fs from 'fs';
import { config } from '../config/config';
import type { LogLevel, LoggingConfig } from '../types';
import chalk from 'chalk';

// Ensure logs directory exists
const logDir = path.resolve(__dirname, '../../logs');
fs.existsSync(logDir) || fs.mkdirSync(logDir, { recursive: true });

// Environment-specific config
const loggingConfig: LoggingConfig = config.logging[
  config.NODE_ENV as keyof typeof config.logging
] as LoggingConfig;

// Custom colors for different log levels
const levelColors = {
  error: chalk.red.bold,
  warn: chalk.yellow.bold,
  info: chalk.green.bold,
  debug: chalk.blue.bold,
  verbose: chalk.cyan.bold,
  silly: chalk.magenta.bold,
};

// Development format - human readable with colors
const developmentFormat = winston.format.combine(
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    const color = levelColors[level as keyof typeof levelColors] || chalk.white;
    let log = `${chalk.gray(timestamp)} ${color(level.padEnd(5))} ${message}`;

    // Print all metadata fields if present
    if (Object.keys(meta).length > 0) {
      log += `\n${chalk.gray('↳')} ${JSON.stringify(meta, null, 2)
        .split('\n')
        .join(`\n${chalk.gray('  ')}`)}`;
    }

    return log;
  }),
);

// Production format - structured JSON
const productionFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format((info) => {
    // Add common fields to all logs
    return {
      ...info,
      service: config.appName,
      version: config.appVersion,
      environment: config.NODE_ENV,
    };
  })(),
  winston.format.json(),
);

// Create transports based on environment
const createTransports = (): winston.transport[] => {
  const transports: winston.transport[] = [];

  // Console transport
  if (loggingConfig.console) {
    transports.push(
      new winston.transports.Console({
        level: loggingConfig.level,
        format: config.isDevelopment ? developmentFormat : productionFormat,
        stderrLevels: ['error'],
      }),
    );
  }

  // File transports (production only)
  if (loggingConfig.file && config.isProduction) {
    transports.push(
      new winston.transports.File({
        filename: path.join(logDir, 'error.log'),
        level: 'error',
        format: productionFormat,
        maxsize: loggingConfig.logRotation?.maxSize || 10 * 1024 * 1024,
        maxFiles: loggingConfig.logRotation?.maxFiles || 10,
      }),
      new winston.transports.File({
        filename: path.join(logDir, 'combined.log'),
        level: loggingConfig.level,
        format: productionFormat,
        maxsize: loggingConfig.logRotation?.maxSize || 10 * 1024 * 1024,
        maxFiles: loggingConfig.logRotation?.maxFiles || 10,
      }),
    );
  }

  return transports;
};

// Logger instance
const logger = winston.createLogger({
  level: loggingConfig.level,
  format: config.isDevelopment ? developmentFormat : productionFormat,
  transports: createTransports(),
  handleExceptions: !!loggingConfig.file,
  handleRejections: !!loggingConfig.file,
  exitOnError: false,
});

// Enhanced logger with better development output
class EnterpriseLogger {
  private logger: winston.Logger;

  constructor(logger: winston.Logger) {
    this.logger = logger;
  }

  // Core logging methods ==============================================
  error(message: string, meta?: Record<string, unknown>): void {
    this.logDev('error', `❌ ${message}`, meta);
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    this.logDev('warn', `⚠️ ${message}`, meta);
  }

  info(message: string, meta?: Record<string, unknown>): void {
    this.logDev('info', message, meta);
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    if (config.isDevelopment) {
      this.logDev('debug', `🐛 ${message}`, meta);
    }
  }

  // Context-aware logging =============================================
  withContext(context: Record<string, unknown>) {
    return {
      error: (message: string, meta?: Record<string, unknown>) =>
        this.error(message, { ...context, ...meta }),
      warn: (message: string, meta?: Record<string, unknown>) =>
        this.warn(message, { ...context, ...meta }),
      info: (message: string, meta?: Record<string, unknown>) =>
        this.info(message, { ...context, ...meta }),
      debug: (message: string, meta?: Record<string, unknown>) =>
        this.debug(message, { ...context, ...meta }),
    };
  }

  // Semantic logging methods =========================================
  startup(message: string, meta?: Record<string, unknown>) {
    this.logDev('info', `🚀 ${message}`, meta);
  }

  shutdown(message: string, meta?: Record<string, unknown>) {
    this.logDev('info', `🛑 ${message}`, meta);
  }

  success(message: string, meta?: Record<string, unknown>) {
    this.logDev('info', `✅ ${message}`, meta);
  }

  failure(message: string, meta?: Record<string, unknown>) {
    this.logDev('error', `❌ ${message}`, meta);
  }

  // Specialized logging methods ======================================
  http(request: { method: string; url: string; status: number; duration: number; ip?: string }) {
    this.info(`${request.method} ${request.url}`, {
      status: request.status,
      duration: request.duration,
      ip: request.ip,
    });
  }

  database(action: string, meta?: Record<string, unknown>) {
    this.debug(`Database: ${action}`, meta);
  }

  // Private methods ==================================================
  private logDev(level: LogLevel, message: string, meta?: Record<string, unknown>) {
    if (config.isProduction) {
      this.log(level, message, meta);
      return;
    }

    // For development, filter and format metadata cleanly
    const devMeta = this.prepareDevMeta(meta);
    this.log(level, message, devMeta);
  }

  private log(level: LogLevel, message: string, meta?: Record<string, unknown>) {
    this.logger.log(level, message, this.sanitize(meta));
  }

  private prepareDevMeta(meta?: Record<string, unknown>): Record<string, unknown> | undefined {
    if (!meta) return undefined;

    const devMeta: Record<string, unknown> = {};
    const includeFields = [
      'error',
      'stack',
      'host',
      'name',
      'readyState',
      'status',
      'uptime',
      'memory',
      'dbStatus',
      'environment',
      'nodeVersion',
      'platform',
      'reason',
      'version',
      'service',
      'duration',
      'ip',
      'method',
      'url',
      'status',
      'duration',
      'method',
      'url',
    ];

    includeFields.forEach((field) => {
      if (meta[field] !== undefined) {
        devMeta[field] = meta[field];
      }
    });

    return Object.keys(devMeta).length > 0 ? devMeta : undefined;
  }

  private sanitize(data?: Record<string, unknown>): Record<string, unknown> | undefined {
    if (!data) return undefined;

    const sensitiveFields = [
      'password',
      'token',
      'secret',
      'key',
      'authorization',
      'access_token',
      'refresh_token',
      'api_key',
    ];

    const result = { ...data };
    sensitiveFields.forEach((field) => {
      if (result[field]) {
        result[field] = '[REDACTED]';
      }
    });

    return result;
  }
}

export const enterpriseLogger = new EnterpriseLogger(logger);
export { logger };
export type { LogLevel, LoggingConfig };
