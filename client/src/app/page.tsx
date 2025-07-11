'use client';

import ThemeToggle from '@/components/layout/theme-toggle';
import { Counter } from '@/components/features/counter';
import { AppInfo } from '@/components/features/app-info';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-bold">My PWA App</h1>
        <p className="text-muted-foreground">This is a Progressive Web App that works offline!</p>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Features:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Works offline</li>
            <li>• Installable on devices</li>
            <li>• Fast loading with caching</li>
            <li>• Native app-like experience</li>
            <li>• Zustand state management</li>
          </ul>
        </div>
        <ThemeToggle />
      </div>

      {/* Zustand Examples */}
      <div className="mt-8 space-y-6">
        <Counter />
        <AppInfo />
      </div>
    </div>
  );
}
