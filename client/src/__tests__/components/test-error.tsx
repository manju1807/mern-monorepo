'use client';

import { useState } from 'react';
import { useDebug } from '@/hooks/use-debug';

export const TestError = () => {
  const [shouldError, setShouldError] = useState(false);
  const { debug, debugInfo, debugWarn } = useDebug();

  debug('TestError component rendered');

  const handleTriggerError = () => {
    debugWarn('About to trigger an error for testing');
    setShouldError(true);
  };

  const handleDebugLog = () => {
    debugInfo('User clicked debug log button', {
      timestamp: new Date().toISOString(),
    });
  };

  // This will trigger the error boundary when shouldError is true
  if (shouldError) {
    debug('Throwing test error');
    throw new Error('This is a test error to demonstrate the error boundary!');
  }

  return (
    <div className="p-6 border rounded-lg bg-card">
      <h2 className="text-xl font-semibold mb-4">Error Boundary Test</h2>
      <p className="text-muted-foreground mb-4">
        This component demonstrates the error boundary and debug logging functionality.
      </p>
      <div className="space-y-2">
        <button
          onClick={handleTriggerError}
          className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
        >
          Trigger Error (Test Error Boundary)
        </button>
        <button
          onClick={handleDebugLog}
          className="ml-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
        >
          Debug Log (Check Console)
        </button>
      </div>
    </div>
  );
};
