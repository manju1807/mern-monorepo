import type { NextConfig } from 'next';

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: false, // Enable PWA in development for testing
  /*  disable: process.env.NODE_ENV === 'development', // Disable PWA in development for production */
});

const nextConfig: NextConfig = {
  turbopack: {},
  reactStrictMode: true,
};

module.exports = withPWA(nextConfig);
