# 🚀 Enterprise MERN Monorepo Template

A production-ready, enterprise-level MERN (MongoDB, Express.js, React, Node.js) monorepo template with comprehensive features for modern web development.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)

## ✨ Features

### 🎯 **Core Architecture**
- **Monorepo Structure**: Organized with pnpm workspaces
- **TypeScript**: Full type safety across frontend and backend
- **Modern Tooling**: Latest versions of all dependencies
- **ES Modules**: Consistent ES module usage throughout

### 🎨 **Frontend (Next.js 15)**
- **Progressive Web App (PWA)**: Full offline support with service workers
- **shadcn/ui**: Complete component library with Radix UI primitives
- **Dark/Light Theme**: System-aware theme switching
- **Turbopack**: Fast development builds
- **App Router**: Next.js 15 App Router with layouts
- **Zustand**: Lightweight state management
- **React Hook Form**: Form handling with Zod validation

### 🔧 **Backend (Express.js)**
- **Enterprise Logging**: Winston-based logging with environment-specific configs
- **Error Handling**: Comprehensive error classification and handling
- **Security Middleware**: Helmet, CORS, rate limiting, input sanitization
- **Database**: MongoDB with Mongoose ODM
- **Health Monitoring**: Built-in health checks and monitoring
- **Graceful Shutdown**: Proper process management

### 🧪 **Testing & Quality**
- **Vitest**: Fast unit testing with UI
- **Storybook**: Component documentation and testing
- **Biome**: Fast linting and formatting
- **Husky**: Git hooks for code quality
- **Coverage Reports**: Comprehensive test coverage
- **Type Checking**: Strict TypeScript configuration

### 🚀 **Development Experience**
- **Hot Reload**: Fast development with file watching
- **Concurrent Scripts**: Run frontend and backend simultaneously
- **Environment Management**: Proper environment variable handling
- **Code Quality**: Automated linting, formatting, and type checking
- **Git Hooks**: Pre-commit and pre-push quality checks

## 📁 Project Structure

```
mern-app/
├── client/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/           # Next.js App Router pages
│   │   ├── components/    # React components
│   │   │   ├── common/    # Reusable components
│   │   │   ├── features/  # Feature-specific components
│   │   │   ├── layout/    # Layout components
│   │   │   └── ui/        # shadcn/ui components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and helpers
│   │   ├── store/         # Zustand state management
│   │   ├── styles/        # Global styles
│   │   ├── types/         # TypeScript definitions
│   │   └── __tests__/     # Test files
│   ├── public/            # Static assets
│   │   ├── manifest.json  # PWA manifest
│   │   └── sw.js         # Service worker
│   └── .storybook/       # Storybook configuration
├── server/                # Express.js backend application
│   ├── src/
│   │   ├── config/       # Configuration management
│   │   ├── controllers/  # Route controllers
│   │   ├── middlewares/  # Express middlewares
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── utils/        # Utilities and helpers
│   │   ├── types/        # TypeScript definitions
│   │   └── __test__/     # Test files
│   └── logs/             # Application logs
├── types/                 # Shared TypeScript types
├── .husky/               # Git hooks
└── biome.json            # Biome configuration
```

## 🚀 Quick Start

### Prerequisites

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0
- **MongoDB**: Running instance (local or cloud)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd mern-app

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development servers
pnpm dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5001
HOST=localhost
MONGODB_URI=mongodb://localhost:27017/your-database

# Client Configuration
NEXT_PUBLIC_API_URL=http://localhost:5001/api

# Optional
CORS_ORIGIN=http://localhost:3000
APP_NAME=Your App Name
APP_VERSION=1.0.0
```

## 🛠️ Available Scripts

### Root Level (Monorepo)

```bash
# Development
pnpm dev              # Start both client and server in development
pnpm build            # Build both client and server
pnpm start            # Start both client and server in production
pnpm test             # Run tests for both client and server
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage reports

# Code Quality
pnpm lint             # Lint all files with Biome
pnpm format           # Format all files with Biome
pnpm check            # Run linting and type checking
pnpm fix              # Auto-fix linting issues

# Storybook
pnpm storybook        # Start Storybook development server
pnpm build-storybook  # Build Storybook for production
```

### Client (Frontend)

```bash
# Development
pnpm --filter ./client dev          # Start Next.js development server
pnpm --filter ./client build        # Build for production
pnpm --filter ./client start        # Start production server

# Testing
pnpm --filter ./client test         # Run Vitest tests
pnpm --filter ./client test:ui      # Run tests with UI
pnpm --filter ./client test:coverage # Run tests with coverage

# PWA Testing
pnpm --filter ./client test:pwa     # Build and test PWA functionality
```

### Server (Backend)

```bash
# Development
pnpm --filter ./server dev          # Start with nodemon
pnpm --filter ./server dev:tsx      # Start with tsx (faster)
pnpm --filter ./server build        # Build TypeScript
pnpm --filter ./server start        # Start production server

# Testing
pnpm --filter ./server test         # Run Vitest tests
pnpm --filter ./server test:watch   # Run tests in watch mode
pnpm --filter ./server test:coverage # Run tests with coverage

# Validation
pnpm --filter ./server validate     # Type checking
pnpm --filter ./server health       # Health check
```

## 🎨 Frontend Features

### Progressive Web App (PWA)

- **Offline Support**: Works without internet connection
- **Installable**: Add to home screen on mobile devices
- **Service Worker**: Automatic caching and updates
- **Manifest**: Web app manifest for native app experience

### UI Components

- **shadcn/ui**: Complete component library
- **Radix UI**: Accessible primitives
- **Tailwind CSS**: Utility-first styling
- **Dark/Light Theme**: System-aware theme switching
- **Responsive Design**: Mobile-first approach

### State Management

- **Zustand**: Lightweight state management
- **React Hook Form**: Form handling with validation
- **Zod**: Schema validation

### Testing

- **Vitest**: Fast unit testing
- **React Testing Library**: Component testing
- **Storybook**: Component documentation
- **Coverage Reports**: Comprehensive test coverage

## 🔧 Backend Features

### Enterprise Logging

- **Winston**: Structured logging
- **Environment-specific**: Different configs for dev/prod/test
- **File Rotation**: Automatic log rotation in production
- **Security**: Sensitive data redaction
- **Performance**: Request/response logging

### Error Handling

- **Custom Error Classes**: BusinessError, ValidationError, etc.
- **Structured Responses**: Consistent error format
- **Environment-aware**: Different error details per environment
- **Logging Integration**: Automatic error logging

### Security

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API rate limiting
- **Input Sanitization**: Request validation
- **Compression**: Response compression

### Database

- **MongoDB**: NoSQL database
- **Mongoose**: Object Document Mapper
- **Connection Management**: Proper connection handling
- **Health Checks**: Database health monitoring

## 🧪 Testing Strategy

### Frontend Testing

```bash
# Run all tests
pnpm --filter ./client test

# Run with UI
pnpm --filter ./client test:ui

# Run with coverage
pnpm --filter ./client test:coverage
```

### Backend Testing

```bash
# Run all tests
pnpm --filter ./server test

# Run in watch mode
pnpm --filter ./server test:watch

# Run with coverage
pnpm --filter ./server test:coverage
```

### Component Testing with Storybook

```bash
# Start Storybook
pnpm storybook

# Build Storybook
pnpm build-storybook
```

## 📊 Code Quality

### Linting & Formatting

- **Biome**: Fast linting and formatting
- **TypeScript**: Strict type checking
- **ESLint**: Additional linting rules
- **Prettier**: Code formatting

### Git Hooks

- **Husky**: Git hooks for quality checks
- **lint-staged**: Run linters on staged files
- **commitlint**: Conventional commit messages

### Quality Checks

```bash
# Run all quality checks
pnpm check

# Auto-fix issues
pnpm fix

# Type checking
pnpm typecheck
```

## 🚀 Deployment

### Frontend Deployment

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify

```bash
# Build the application
pnpm --filter ./client build

# Deploy to Netlify
# Upload .next folder to Netlify
```

### Backend Deployment

#### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy
railway up
```

#### Heroku

```bash
# Install Heroku CLI
# Create Procfile
echo "web: npm start" > Procfile

# Deploy
git push heroku main
```

### Environment Variables

Set these environment variables in your deployment platform:

```env
NODE_ENV=production
MONGODB_URI=your-mongodb-connection-string
CORS_ORIGIN=https://your-frontend-domain.com
```

## 🔍 Monitoring & Debugging

### Health Checks

```bash
# Check server health
curl http://localhost:5001/health
```

### Logs

- **Development**: Colored console output
- **Production**: Structured JSON logs
- **File Rotation**: Automatic log rotation
- **Error Tracking**: Comprehensive error logging

### Performance

- **Request Logging**: Automatic request/response logging
- **Performance Metrics**: Built-in performance monitoring
- **Memory Usage**: Memory usage tracking
- **Database Monitoring**: Database connection monitoring

## 📚 Documentation

### API Documentation

- **OpenAPI/Swagger**: API documentation (to be implemented)
- **JSDoc**: Code documentation
- **TypeScript**: Type definitions as documentation

### Component Documentation

- **Storybook**: Interactive component documentation
- **Props Documentation**: Component prop documentation
- **Usage Examples**: Real-world usage examples

## 🤝 Contributing

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** your changes
5. **Commit** with conventional commit messages
6. **Push** to your branch
7. **Create** a pull request

### Code Standards

- **TypeScript**: Strict type checking
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Conventional Commits**: Standard commit messages
- **Testing**: Comprehensive test coverage

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Vercel**: For the deployment platform
- **shadcn/ui**: For the component library
- **Radix UI**: For accessible primitives
- **Vitest**: For fast testing
- **Storybook**: For component documentation
- **Biome**: For fast linting and formatting

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/mern-monorepo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/mern-monorepo/discussions)
- **Documentation**: [Wiki](https://github.com/yourusername/mern-monorepo/wiki)

---

**Made with ❤️ for the developer community**
