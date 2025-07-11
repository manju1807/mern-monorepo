'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Wifi, WifiOff } from 'lucide-react';

// Define the type for the beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted to prevent hydration mismatch
    setIsMounted(true);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set initial online status
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    setDeferredPrompt(null);
  };

  // Don't render anything until component is mounted to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  if (isInstalled) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end space-y-2 pointer-events-none">
      {/* Online/Offline Status */}
      <div className="flex items-center gap-2 bg-background/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg transition-all duration-300 hover:shadow-xl pointer-events-auto">
        {isOnline ? (
          <Wifi className="h-4 w-4 text-green-500" />
        ) : (
          <WifiOff className="h-4 w-4 text-red-500" />
        )}
        <span className="text-sm font-medium">{isOnline ? 'Online' : 'Offline'}</span>
      </div>

      {/* Install Button */}
      {deferredPrompt && (
        <Button
          onClick={handleInstallClick}
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 pointer-events-auto"
          size="default"
        >
          <Download className="h-4 w-4 mr-2" />
          Install App
        </Button>
      )}

      {/* Development Mode Indicator -- TODO: Remove this once we are done testing and ready to deploy */}
      {!deferredPrompt && process.env.NODE_ENV === 'development' && (
        <div className="flex items-center gap-2 bg-yellow-500/95 backdrop-blur-sm border border-yellow-600 rounded-lg px-3 py-2 shadow-lg pointer-events-auto">
          <span className="text-sm font-medium text-yellow-900">PWA Installer (Dev Mode)</span>
        </div>
      )}
    </div>
  );
}
