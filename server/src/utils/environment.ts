/**
 * Environment configuration utility
 *
 * Features:
 * - Environment validation
 * - Configuration loading
 * - Environment-specific defaults
 * - Type safety
 */

// Environment validation
export const validateEnvironment = (): void => {
  const requiredVars = ['MONGODB_URI'];
  const missingVars: string[] = [];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
};

export function getEnvVar(name: string, required = true): string {
  const value = process.env[name];
  if (!value && required) {
    throw new Error(`Environment variable ${name} is required but not defined.`);
  }
  return value as string;
}

export function getEnvVarWithDefault(name: string, defaultValue: string): string {
  return process.env[name] || defaultValue;
}
