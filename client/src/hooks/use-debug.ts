'use client';

export const useDebug = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const debug = (message: string, ...args: unknown[]) => {
    if (isDevelopment) {
      console.log(`🐛 [DEBUG] ${message}`, ...args);
    }
  };

  const debugError = (message: string, error: Error) => {
    if (isDevelopment) {
      console.group(`🚨 [DEBUG ERROR] ${message}`);
      console.error('Error:', error);
      console.error('Stack:', error.stack);
      console.groupEnd();
    }
  };

  const debugInfo = (message: string, data?: unknown) => {
    if (isDevelopment) {
      console.info(`ℹ️ [DEBUG INFO] ${message}`, data);
    }
  };

  const debugWarn = (message: string, ...args: unknown[]) => {
    if (isDevelopment) {
      console.warn(`⚠️ [DEBUG WARN] ${message}`, ...args);
    }
  };

  return {
    debug,
    debugError,
    debugInfo,
    debugWarn,
    isDevelopment,
  };
};
