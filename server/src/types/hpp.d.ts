declare module 'hpp' {
  import { RequestHandler } from 'express';
  const hpp: (options?: {
    whitelist?: string[];
    checkBody?: boolean;
    checkBodyOnlyForContentType?: string[];
    checkQuery?: boolean;
  }) => RequestHandler;
  export = hpp;
}
