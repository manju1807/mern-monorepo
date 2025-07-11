import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { errorHandler } from '../middlewares/error-handler';

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
  });
  afterEach(() => {
    process.env.NODE_ENV = oldEnv;
  });

  it('returns stack and message in development', () => {
    process.env.NODE_ENV = 'development';
    const err = new Error('Test error');
    const req = {} as any;
    const res = getMockRes();
    const next = vi.fn();
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Server error',
        error: 'Test error',
        errorStack: expect.any(String),
      }),
    );
    expect(next).toHaveBeenCalled();
  });

  it('returns generic message in production', () => {
    process.env.NODE_ENV = 'production';
    const err = new Error('Prod error');
    const req = {} as any;
    const res = getMockRes();
    const next = vi.fn();
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'An unexpected error occurred',
        error: undefined,
        errorStack: undefined,
      }),
    );
    expect(next).toHaveBeenCalled();
  });
});
