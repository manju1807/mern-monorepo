// AppInfo.tsx (new UI version)
'use client';

import { useAppStore } from '@/store/features/use-app-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, RotateCcw, Calendar } from 'lucide-react';

export function AppInfo() {
  const {
    theme,
    language,
    isLoading,
    lastVisit,
    setTheme,
    setLanguage,
    setLoading,
    updateLastVisit,
    resetApp,
  } = useAppStore();

  const handleToggleLoading = () => {
    setLoading(!isLoading);
  };

  const handleUpdateVisit = () => {
    updateLastVisit();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          App State (Persisted)
        </CardTitle>
        <CardDescription>Advanced Zustand store with localStorage persistence</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Theme:</span>
            <Badge variant="outline">{theme}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Language:</span>
            <Badge variant="outline">{language}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Loading:</span>
            <Badge variant={isLoading ? 'default' : 'secondary'}>{isLoading ? 'Yes' : 'No'}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Last Visit:</span>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span className="text-xs text-muted-foreground">
                {lastVisit ? new Date(lastVisit).toLocaleDateString() : 'Never'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            variant="outline"
            size="sm"
          >
            Toggle Theme
          </Button>

          <Button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            variant="outline"
            size="sm"
          >
            Toggle Language
          </Button>

          <Button onClick={handleToggleLoading} variant="outline" size="sm">
            Toggle Loading
          </Button>

          <Button onClick={handleUpdateVisit} variant="outline" size="sm">
            Update Visit
          </Button>
        </div>

        <div className="flex justify-center">
          <Button onClick={resetApp} variant="destructive" size="sm" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
