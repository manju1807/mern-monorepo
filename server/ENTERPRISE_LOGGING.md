# Enterprise Logging System

This document describes the enterprise-level logging system implemented in the server application.

## Overview

The logging system is designed to provide different behaviors based on the environment:

- **Development**: Console logging only with detailed debug information
- **Production**: File logging only with structured JSON format
- **Test**: Minimal logging for testing purposes

## Environment Configuration

### Development Environment (`NODE_ENV=development`)

- **Console Output**: Colored, human-readable logs
- **Log Level**: `debug` (most verbose)
- **File Logging**: Disabled
- **Stack Traces**: Enabled
- **Request Logging**: Enabled

### Production Environment (`NODE_ENV=production`)

- **Console Output**: Disabled (no console logging)
- **Log Level**: `warn` (only warnings and errors)
- **File Logging**: Enabled with rotation
- **Stack Traces**: Disabled (security)
- **Request Logging**: Disabled (performance)

### Test Environment (`NODE_ENV=test`)

- **Console Output**: Disabled
- **Log Level**: `error` (only errors)
- **File Logging**: Disabled
- **Stack Traces**: Disabled
- **Request Logging**: Disabled

## Usage

### Basic Logging

```typescript
import { enterpriseLogger } from "./utils/logger";

// Standard logging methods
enterpriseLogger.error("Error message", { context: "additional data" });
enterpriseLogger.warn("Warning message");
enterpriseLogger.info("Info message");
enterpriseLogger.debug("Debug message"); // Only in development
```

### Enterprise-Specific Logging

```typescript
// Security events
enterpriseLogger.security("Failed login attempt", {
  ip: "192.168.1.1",
  userAgent: "Mozilla/5.0...",
});

// Performance monitoring
enterpriseLogger.performance("Database query completed", 150, {
  query: "SELECT * FROM users",
  rowsReturned: 100,
});

// Audit trails
enterpriseLogger.audit("User updated profile", "user123", "UPDATE_PROFILE", {
  changes: { email: "new@email.com" },
});

// Business events
enterpriseLogger.business("Order created", {
  orderId: "ORD-12345",
  amount: 99.99,
  customerId: "cust-456",
});

// Health checks
enterpriseLogger.health("database", "healthy");
enterpriseLogger.health("redis", "unhealthy", { error: "Connection timeout" });
```

### Error Handling

```typescript
import {
  BusinessError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
} from "./middlewares/error-handler";

// Throw business errors
throw new BusinessError("Invalid input data", 400);

// Throw validation errors
throw new ValidationError("Email is required", "email");

// Throw authentication errors
throw new AuthenticationError("Invalid credentials");

// Throw authorization errors
throw new AuthorizationError("Insufficient permissions");

// Throw not found errors
throw new NotFoundError("User not found");
```

## Configuration

### Environment Variables

```bash
# Required
NODE_ENV=development|production|test
MONGODB_URI=mongodb://localhost:27017/database

# Optional
PORT=5001
HOST=localhost
CORS_ORIGIN=http://localhost:3000
```

### Logging Configuration

The logging behavior is automatically configured based on `NODE_ENV`:

```typescript
// Development
{
  level: 'debug',
  console: true,
  file: false,
  format: 'colored',
  includeStack: true,
  includeTimestamp: true,
}

// Production
{
  level: 'warn',
  console: false,
  file: true,
  format: 'json',
  includeStack: false,
  includeTimestamp: true,
  logRotation: {
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 10,
    compress: true,
  },
}

// Test
{
  level: 'error',
  console: false,
  file: false,
  format: 'json',
  includeStack: false,
  includeTimestamp: false,
}
```

## Log Files

In production, logs are written to the following files:

- `logs/combined.log`: All log levels (warn and above)
- `logs/error.log`: Only error level logs
- `logs/exceptions.log`: Uncaught exceptions
- `logs/rejections.log`: Unhandled promise rejections

## Security Features

### Data Sanitization

Sensitive data is automatically redacted from logs:

```typescript
// These fields are automatically redacted
const sensitiveFields = ["password", "token", "secret", "key", "authorization"];

// Example: This will be logged as { password: '[REDACTED]' }
enterpriseLogger.info("User login", {
  username: "john.doe",
  password: "secret123", // This will be redacted
});
```

### Environment-Specific Error Responses

```typescript
// Development response
{
  "message": "Server error",
  "error": "Database connection failed",
  "errorCode": "DatabaseError",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/users",
  "method": "GET"
}

// Production response
{
  "message": "An unexpected error occurred",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/users",
  "method": "GET"
}
```

## Performance Monitoring

### Request Logging

Request/response logging is automatically handled:

```typescript
// Automatically logs:
// - Request method, URL, IP
// - Response status code
// - Request duration
// - User agent
```

### Performance Logging

```typescript
// Log performance metrics
enterpriseLogger.performance("Database query", 150, {
  query: "SELECT * FROM users WHERE active = true",
  rowsReturned: 1000,
});
```

## Health Monitoring

### Health Check Endpoint

```bash
GET /health
```

Response:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "environment": "production",
  "version": "1.0.0",
  "checks": {
    "database": "healthy",
    "memory": {
      "rss": 52428800,
      "heapTotal": 20971520,
      "heapUsed": 10485760
    }
  }
}
```

### Health Logging

```typescript
// Log component health
enterpriseLogger.health("database", "healthy");
enterpriseLogger.health("redis", "unhealthy", { error: "Connection timeout" });
```

## Best Practices

### 1. Use Appropriate Log Levels

```typescript
// Use error for actual errors
enterpriseLogger.error("Database connection failed", { error: err.message });

// Use warn for recoverable issues
enterpriseLogger.warn("Rate limit exceeded", { ip: req.ip });

// Use info for important events
enterpriseLogger.info("User registered", { userId: user.id });

// Use debug for detailed debugging (development only)
enterpriseLogger.debug("Processing request", { body: req.body });
```

### 2. Include Context

```typescript
// Good: Include relevant context
enterpriseLogger.error("Payment failed", {
  orderId: order.id,
  amount: order.amount,
  paymentMethod: order.paymentMethod,
  error: error.message,
});

// Bad: No context
enterpriseLogger.error("Payment failed");
```

### 3. Use Enterprise-Specific Methods

```typescript
// For security events
enterpriseLogger.security("Failed login", {
  ip: req.ip,
  username: req.body.username,
});

// For business events
enterpriseLogger.business("Order completed", {
  orderId: order.id,
  revenue: order.total,
});

// For audit trails
enterpriseLogger.audit("Data exported", userId, "EXPORT_DATA", {
  recordCount: 1000,
});
```

### 4. Handle Errors Properly

```typescript
// Use custom error classes
try {
  const user = await findUser(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
} catch (error) {
  // Error handler will automatically log and format the response
  next(error);
}
```

## Scripts

### Development

```bash
# Start development server
npm run dev

# Start with tsx (faster)
npm run dev:tsx
```

### Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Validation

```bash
# Type checking
npm run validate

# Environment health check
npm run health
```

## Monitoring and Alerting

The logging system is designed to integrate with monitoring tools:

- **Structured JSON logs** for easy parsing
- **Consistent log levels** for filtering
- **Request IDs** for request tracing
- **Performance metrics** for monitoring
- **Health checks** for uptime monitoring

## Troubleshooting

### Common Issues

1. **No logs in production**: Check that `NODE_ENV=production`
2. **Too many logs in development**: Check that `NODE_ENV=development`
3. **Missing log files**: Ensure the `logs/` directory exists and is writable
4. **Performance issues**: Disable request logging in production

### Debug Mode

Enable debug logging in development:

```typescript
// This will only work in development
enterpriseLogger.debug("Debug information", { data: "value" });
```

### Log Rotation

In production, logs are automatically rotated:

- Max file size: 10MB
- Max files: 10
- Compression: Enabled
- Tailable: Enabled for real-time monitoring
