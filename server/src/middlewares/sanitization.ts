import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

// SanitizeFunction now only accepts string or unknown
// If value is not a string, it will be ignored in sanitizeObject
// This improves type safety

type SanitizeFunction = (value: string) => string;

const sanitizeObject = (
  obj: Record<string, unknown> | null | undefined,
  sanitizeFunc: SanitizeFunction,
): void => {
  if (obj === null || obj === undefined) {
    return;
  }

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'string') {
      obj[key] = sanitizeFunc(obj[key] as string);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitizeObject(obj[key] as Record<string, unknown>, sanitizeFunc);
    }
  });
};

const createSanitizer = (sanitizeFunc: SanitizeFunction) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      sanitizeObject(req.body, sanitizeFunc);
      sanitizeObject(req.query, sanitizeFunc);
      sanitizeObject(req.params, sanitizeFunc);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const sanitizeXSS = createSanitizer(validator.escape);

export const sanitizeMongoDB = createSanitizer((value: string) => {
  // Remove MongoDB operators
  return value.replace(/\$[a-zA-Z0-9]+/g, '');
});
