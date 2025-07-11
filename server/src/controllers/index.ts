import { asyncHandler } from '@/middlewares/async-handler';
import { Request, Response } from 'express';
import os from 'os';

// Health check endpoint
export const HealthCheck = asyncHandler(async (req: Request, res: Response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    nodeVersion: process.version,
    memoryUsage: process.memoryUsage(),
    cpuUsage: process.cpuUsage(),
    hostname: os.hostname(),
    platformInfo: {
      platform: os.platform(),
      release: os.release(),
      type: os.type(),
    },
  };
  res.status(200).json(healthcheck);
});
