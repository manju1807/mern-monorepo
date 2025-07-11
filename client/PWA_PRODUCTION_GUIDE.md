# PWA Production Deployment Guide

## Pre-Production Checklist

### ✅ Current Status (Development Mode)

- PWA is enabled in development for testing
- Development indicator shows in PWA installer
- Hydration issues are resolved

---

## Step 1: Prepare for Production

### 1.1 Update Next.js Configuration

**File:** `next.config.ts`

```typescript
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // ✅ Production ready
});
```

### 1.2 Remove Development Indicators

**File:** `client/src/components/pwa-installer.tsx`

- Remove the development mode indicator section
- Keep the hydration fix (`isMounted` state)

### 1.3 Update Package Scripts

**File:** `package.json`

```json
{
  "scripts": {
    "build:prod": "next build",
    "start:prod": "next start"
  }
}
```

---

## Step 2: Environment Setup

### 2.1 Set Production Environment

```bash
# Set NODE_ENV to production
export NODE_ENV=production
```

### 2.2 Install Dependencies

```bash
npm install
# or
pnpm install
```

---

## Step 3: Build for Production

### 3.1 Create Production Build

```bash
npm run build:prod
# or
pnpm build:prod
```

### 3.2 Verify Build Output

- Check `.next` folder is created
- Verify `public/sw.js` exists (Service Worker)
- Confirm `public/manifest.json` is accessible

---

## Step 4: Deploy to Production Server

### 4.1 Choose Your Hosting Platform

#### Option A: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Option B: Netlify

```bash
# Build locally
npm run build:prod

# Deploy to Netlify
# Upload .next folder to Netlify
```

#### Option C: Custom Server

```bash
# Start production server
npm run start:prod
```

### 4.2 HTTPS Requirements

**CRITICAL:** PWA install prompts only work over HTTPS

- Ensure your domain has SSL certificate
- Use HTTPS in production URLs
- Test with `https://yourdomain.com`

---

## Step 5: PWA Testing Checklist

### 5.1 Browser Testing

- [ ] Chrome: Open DevTools → Application → Manifest
- [ ] Firefox: Check PWA install prompt
- [ ] Safari: Test on iOS device
- [ ] Edge: Verify PWA functionality

### 5.2 PWA Criteria Verification

- [ ] HTTPS connection ✅
- [ ] Valid manifest.json ✅
- [ ] Service worker registered ✅
- [ ] Icons available (192x192, 512x512) ✅
- [ ] App not already installed ✅

### 5.3 Install Prompt Testing

- [ ] Visit site in incognito mode
- [ ] Look for install button in address bar
- [ ] Test "Add to Home Screen" on mobile
- [ ] Verify offline functionality

---

## Step 6: Production Monitoring

### 6.1 Analytics Setup

```javascript
// Add to your app for PWA analytics
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.ready.then(() => {
    // Track PWA installs
    analytics.track("PWA Installed");
  });
}
```

### 6.2 Performance Monitoring

- Monitor Core Web Vitals
- Track PWA install rates
- Monitor offline usage

---

## Step 7: Troubleshooting

### Common Issues:

#### Issue: Install prompt not showing

**Solutions:**

- Ensure HTTPS is enabled
- Check manifest.json is valid
- Verify icons are accessible
- Clear browser cache

#### Issue: Service worker not registering

**Solutions:**

- Check `next.config.ts` PWA settings
- Verify `public/sw.js` exists
- Check browser console for errors

#### Issue: Offline functionality broken

**Solutions:**

- Verify service worker cache strategy
- Check network requests in DevTools
- Test with airplane mode

---

## Step 8: Maintenance

### 8.1 Regular Updates

- Update service worker cache strategies
- Refresh PWA manifest when needed
- Monitor browser PWA support changes

### 8.2 Version Management

```javascript
// In your service worker
const CACHE_VERSION = "v1.0.0";
const CACHE_NAME = `my-pwa-${CACHE_VERSION}`;
```

---

## Quick Commands Reference

```bash
# Development (current)
npm run dev

# Production build
npm run build:prod

# Production server
npm run start:prod

# Test PWA locally
npm run test:pwa

# Deploy to Vercel
vercel --prod
```

---

## Important Notes

1. **HTTPS is mandatory** for PWA install prompts
2. **Service workers** only work over HTTPS
3. **Browser support** varies (Chrome, Firefox, Safari, Edge)
4. **Mobile testing** is crucial for PWA success
5. **Offline functionality** should be thoroughly tested

---

## Support Resources

- [Next.js PWA Documentation](https://github.com/shadowwalker/next-pwa)
- [Web App Manifest Guide](https://web.dev/add-manifest/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [PWA Best Practices](https://web.dev/progressive-web-apps/)

---

**Save this guide for future reference!** 📚
