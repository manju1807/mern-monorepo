// Type definitions for better type safety
export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export interface LoggingConfig {
  level: LogLevel;
  console: boolean;
  file: boolean;
  format: 'colored' | 'json';
  includeStack: boolean;
  includeTimestamp: boolean;
  logRotation?: {
    maxSize: number;
    maxFiles: number;
    compress: boolean;
  };
}
