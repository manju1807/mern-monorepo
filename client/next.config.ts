import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

const nextConfig: NextConfig = {
  turbopack: {},
  reactStrictMode: true,
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: false, // Enable PWA in development for testing
  /*  disable: process.env.NODE_ENV === 'development', // Disable PWA in development for production */
})(nextConfig);
