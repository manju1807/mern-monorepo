# PWA Configuration Guide

Your Next.js app has been configured as a Progressive Web App (PWA) with offline functionality.

## Features Implemented

✅ **PWA Configuration**

- Web App Manifest (`/public/manifest.json`)
- Service Worker for offline caching
- PWA metadata in layout
- Install prompt component
- Offline status indicator

✅ **Offline Functionality**

- Network-first caching strategy
- Offline page component
- Service worker caching
- Automatic cache updates

## Files Added/Modified

### Configuration Files

- `next.config.ts` - Added PWA plugin configuration
- `public/manifest.json` - Web app manifest
- `public/browserconfig.xml` - Windows tile configuration
- `public/sw.js` - Custom service worker

### Components

- `src/components/pwa-installer.tsx` - Install prompt and online status
- `src/components/offline-page.tsx` - Offline indicator
- `src/app/layout.tsx` - Updated with PWA metadata
- `src/app/page.tsx` - Updated with PWA installer

## Testing Your PWA

### 1. Build and Test

```bash
pnpm build
pnpm start
```

### 2. PWA Testing Checklist

- [ ] Open Chrome DevTools → Application tab
- [ ] Check "Manifest" section shows your app details
- [ ] Check "Service Workers" section shows active worker
- [ ] Test offline functionality (DevTools → Network → Offline)
- [ ] Test install prompt (should appear in browser address bar)

### 3. Mobile Testing

- [ ] Open app on mobile device
- [ ] Look for "Add to Home Screen" option
- [ ] Test offline functionality
- [ ] Verify app launches from home screen

## Important Notes

### Icons

You need to replace the placeholder icon files with actual PNG images:

- `/public/icon-192x192.png` (192x192 pixels)
- `/public/icon-512x512.png` (512x512 pixels)

### HTTPS Requirement

PWAs require HTTPS in production. For local development, localhost is considered secure.

### Browser Support

- Chrome/Edge: Full PWA support
- Firefox: Basic PWA support
- Safari: Limited PWA support (iOS 11.3+)

## Customization

### Update App Details

Edit `/public/manifest.json` to change:

- App name and description
- Theme colors
- Icon paths
- Display mode

### Modify Caching Strategy

Edit `next.config.ts` to change caching behavior:

- `NetworkFirst`: Try network, fallback to cache
- `CacheFirst`: Try cache, fallback to network
- `StaleWhileRevalidate`: Serve from cache, update in background

### Custom Service Worker

Edit `/public/sw.js` to add custom caching logic or offline functionality.

## Troubleshooting

### Service Worker Not Registering

- Check browser console for errors
- Ensure HTTPS (or localhost)
- Clear browser cache and reload

### Install Prompt Not Showing

- App must meet PWA criteria
- User must not have dismissed prompt recently
- Check manifest.json is valid

### Offline Not Working

- Verify service worker is active
- Check cache storage in DevTools
- Ensure resources are being cached

## Next Steps

1. Replace placeholder icons with your app icons
2. Customize the manifest.json with your app details
3. Test thoroughly on different devices
4. Deploy to HTTPS hosting service
5. Submit to app stores (optional)
