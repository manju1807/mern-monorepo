'use client';

import { useCounterStore } from '@/store/features/use-counter-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Minus, RotateCcw } from 'lucide-react';

export function Counter() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Zustand Counter</CardTitle>
        <CardDescription className="text-center">
          A simple counter using Zustand state management
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-6xl font-bold text-primary mb-4">{count}</div>
          <p className="text-sm text-muted-foreground">Current count value</p>
        </div>

        <div className="flex gap-2 justify-center">
          <Button onClick={decrement} variant="outline" size="icon" className="h-10 w-10">
            <Minus className="h-4 w-4" />
          </Button>

          <Button onClick={increment} size="icon" className="h-10 w-10">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-center">
          <Button onClick={reset} variant="secondary" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
