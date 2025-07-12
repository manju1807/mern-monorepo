import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { errorHandler } from '../middlewares/error-handler';
import { enterpriseLogger } from '../utils/logger';

// Mock the logger
vi.mocked(enterpriseLogger);

const getMockRes = () => {
  const res: any = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };
  return res;
};

describe('errorHandler middleware', () => {
  let oldEnv: string | undefined;
  beforeEach(() => {
    oldEnv = process.env.NODE_ENV;
    vi.clearAllMocks();
  });
  afterEach(() => {
    process.env.NODE_ENV = oldEnv;
  });

    it('handles errors correctly', () => {
    const err = new Error('Test error');
    const req = { path: '/test' } as any;
    const res = getMockRes();
    const next = vi.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.any(String),
        error: 'Error',
        timestamp: expect.any(String),
        path: '/test',
      }),
    );

    // Verify that the logger was called
    expect(enterpriseLogger.error).toHaveBeenCalledWith('Test error', expect.any(Object));
  });
});
