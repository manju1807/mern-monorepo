import { config } from '@/config/config';
import rateLimit from 'express-rate-limit';
import { enterpriseLogger } from '../utils/logger';

// Rate limiting (simplified)
export const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  handler: (req, res) => {
    enterpriseLogger.warn('Rate limit exceeded', {
      ip: req.ip,
      path: req.path,
    });
    res.status(429).json({
      error: 'Too many requests',
      retryAfter: Math.ceil(config.rateLimit.windowMs / 1000),
    });
  },
});
