# Project Structure

This Next.js application follows a well-organized, scalable structure that separates concerns and promotes maintainability.

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── common/           # Reusable components (error boundaries, etc.)
│   ├── features/         # Feature-specific components
│   ├── layout/           # Layout-related components (theme, navigation)
│   └── ui/              # UI component library (shadcn/ui)
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── constants/        # Application constants
│   ├── helpers/          # Helper functions
│   ├── validations/      # Validation schemas
│   └── utils.ts         # General utilities
├── store/               # State management
│   ├── app/             # App-wide state
│   └── features/        # Feature-specific state
├── styles/              # Global styles
├── types/               # TypeScript type definitions
│   ├── api/             # API-related types
│   ├── components/      # Component types
│   └── store/           # Store types
└── __tests__/           # Test files
    └── components/      # Component tests
```

## Component Organization

### Common Components (`components/common/`)

- **error-boundary.tsx**: Global error boundary component
- Reusable components that are used across multiple features

### Feature Components (`components/features/`)

- **app-info.tsx**: Application information display
- **counter.tsx**: Counter functionality
- **pwa-installer.tsx**: PWA installation component
- **offline-page.tsx**: Offline page component
- Feature-specific components that implement business logic

### Layout Components (`components/layout/`)

- **theme-provider.tsx**: Theme context provider
- **theme-toggle.tsx**: Theme toggle component
- Components that handle layout, navigation, and global UI elements

### UI Components (`components/ui/`)

- Complete shadcn/ui component library
- Reusable UI primitives (buttons, inputs, dialogs, etc.)

## State Management

### App Store (`store/app/`)

- Global application state
- User preferences, theme settings, etc.

### Feature Stores (`store/features/`)

- Feature-specific state management
- Counter state, PWA state, etc.

## Testing

### Component Tests (`__tests__/components/`)

- Unit tests for React components
- Test files are co-located with their components

## Best Practices

1. **Component Organization**: Components are organized by their purpose and scope
2. **Feature-based Structure**: Related functionality is grouped together
3. **Separation of Concerns**: UI components are separate from business logic
4. **Type Safety**: Comprehensive TypeScript definitions
5. **Testing**: Tests are organized alongside the code they test

## Import Conventions

```typescript
// UI components
import { Button } from "@/components/ui/button";

// Feature components
import { Counter } from "@/components/features/counter";

// Layout components
import { ThemeToggle } from "@/components/layout/theme-toggle";

// Common components
import { ErrorBoundary } from "@/components/common/error-boundary";

// Hooks
import { useCounter } from "@/hooks/use-counter";

// Store
import { useAppStore } from "@/store/app/use-app-store";

// Utils
import { cn } from "@/lib/utils";
```
