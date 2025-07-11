declare module 'next-pwa' {
  import { NextConfig } from 'next';

  // Define specific types for PWA configuration
  interface Manifest {
    name?: string;
    short_name?: string;
    description?: string;
    start_url?: string;
    display?: string;
    background_color?: string;
    theme_color?: string;
    icons?: Array<{
      src: string;
      sizes?: string;
      type?: string;
      purpose?: string;
    }>;
    [key: string]: unknown;
  }

  type ManifestTransform = (manifest: Manifest) => Manifest;
  type ManifestEntry = { url: string; revision?: string };
  type CacheKeyWillBeUsed = (options: { request: Request; mode: string }) => Request | string;
  type CacheWillUpdate = (options: { request: Request; response: Response }) => Response | null;
  type CacheResponseWillBeUsed = (options: {
    request: Request;
    response: Response;
    cacheName: string;
  }) => Response | null;
  type FetchDidFail = (options: { request: Request; error: Error }) => void;
  type FetchDidSucceed = (options: { request: Request; response: Response }) => Response | null;
  type RequestWillFetch = (options: { request: Request }) => Request | null;
  type ResponseWillBeCached = (options: {
    request: Request;
    response: Response;
    cacheName: string;
  }) => Response | null;
  type GeneratePayload = (options: { cacheName: string; url: string }) => unknown;
  type Plugin = {
    cacheKeyWillBeUsed?: CacheKeyWillBeUsed;
    cacheWillUpdate?: CacheWillUpdate;
    cacheResponseWillBeUsed?: CacheResponseWillBeUsed;
    fetchDidFail?: FetchDidFail;
    fetchDidSucceed?: FetchDidSucceed;
    requestWillFetch?: RequestWillFetch;
    responseWillBeCached?: ResponseWillBeCached;
  };

  interface PWAConfig {
    dest?: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    sw?: string;
    scope?: string;
    reloadOnOnline?: boolean;
    fallbacks?: {
      image?: string;
      document?: string;
      font?: string;
      audio?: string;
      video?: string;
    };
    cacheStartUrl?: boolean;
    dynamicStartUrl?: boolean;
    dynamicStartUrlRedirect?: string;
    buildExcludes?: (string | RegExp)[];
    exclude?: (string | RegExp)[];
    publicExcludes?: (string | RegExp)[];
    manifestTransforms?: ManifestTransform[];
    additionalManifestEntries?: ManifestEntry[];
    dontCacheBustURLsMatching?: RegExp;
    modifyURLPrefix?: { [key: string]: string };
    navigateFallback?: string;
    navigateFallbackDenylist?: RegExp[];
    navigateFallbackAllowlist?: RegExp[];
    offlineGoogleAnalytics?: boolean | object;
    mode?: 'production' | 'development';
    runtimeCaching?: Array<{
      urlPattern: RegExp | string;
      handler: 'CacheFirst' | 'NetworkFirst' | 'NetworkOnly' | 'CacheOnly' | 'StaleWhileRevalidate';
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'PATCH';
      options?: {
        cacheName?: string;
        expiration?: {
          maxEntries?: number;
          maxAgeSeconds?: number;
          purgeOnQuotaError?: boolean;
        };
        cacheKeyWillBeUsed?: CacheKeyWillBeUsed;
        cacheWillUpdate?: CacheWillUpdate;
        cacheResponseWillBeUsed?: CacheResponseWillBeUsed;
        fetchDidFail?: FetchDidFail;
        fetchDidSucceed?: FetchDidSucceed;
        requestWillFetch?: RequestWillFetch;
        responseWillBeCached?: ResponseWillBeCached;
        backgroundSync?: {
          name: string;
          options?: {
            maxRetentionTime?: number;
          };
        };
        broadcastUpdate?: {
          channelName?: string;
          options?: {
            headersToCheck?: string[];
            generatePayload?: GeneratePayload;
          };
        };
        matchOptions?: {
          ignoreSearch?: boolean;
          ignoreMethod?: boolean;
          ignoreVary?: boolean;
        };
        networkTimeoutSeconds?: number;
        plugins?: Plugin[];
        precacheFallback?: {
          fallbackURL: string;
        };
        rangeRequests?: boolean;
      };
    }>;
  }

  // The actual API: next-pwa exports a function that takes PWA config and returns a function
  function withPWA(pwaConfig: PWAConfig): (nextConfig: NextConfig) => NextConfig;

  export = withPWA;
}
