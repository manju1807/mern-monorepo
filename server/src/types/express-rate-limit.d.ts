declare module 'express-rate-limit' {
  import { Request, Response, NextFunction } from 'express';

  interface Options {
    windowMs?: number;
    max?: number;
    message?: string | object;
    statusCode?: number;
    headers?: boolean;
    keyGenerator?: (req: Request) => string;
    skip?: (req: Request) => boolean;
    handler?: (req: Request, res: Response, next: NextFunction) => void;
  }

  function rateLimit(options?: Options): (req: Request, res: Response, next: NextFunction) => void;

  export = rateLimit;
}
