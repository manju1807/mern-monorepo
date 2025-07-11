/**
 * Helmet Security Middleware Configuration
 *
 * Provides secure HTTP headers with environment-specific configurations
 */

import helmet from 'helmet';
import { config } from '../config/config';

export const helmetMiddleware = () => {
  if (config.isProduction) {
    return helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
      crossOriginEmbedderPolicy: false,
    });
  }

  return helmet();
};
