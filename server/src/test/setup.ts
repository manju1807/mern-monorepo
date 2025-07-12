// Test setup file for server tests
import { config } from 'dotenv'
import { vi } from 'vitest'

// Load environment variables for tests
config({ path: '.env.test' })

// Set default test environment variables
process.env.NODE_ENV = 'test'
process.env.MONGODB_URI = 'mongodb://localhost:27017/test'

// Mock the logger to prevent actual logging during tests
vi.mock('../utils/logger', () => ({
  enterpriseLogger: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
    startup: vi.fn(),
    shutdown: vi.fn(),
    success: vi.fn(),
    failure: vi.fn(),
    http: vi.fn(),
    database: vi.fn(),
    withContext: vi.fn(() => ({
      error: vi.fn(),
      warn: vi.fn(),
      info: vi.fn(),
      debug: vi.fn(),
    })),
  },
  logger: {
    log: vi.fn(),
  },
}))
