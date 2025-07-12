// async-handler.ts
// Utility to wrap async route handlers and forward errors to Express error middleware
import { NextFunction, Request, RequestHandler, Response } from 'express';

export function asyncHandler(
  // biome-ignore lint/suspicious/noExplicitAny: Express async handler pattern
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
): RequestHandler {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
