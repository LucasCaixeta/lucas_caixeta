/**
 * Service Worker for Lucas Caixeta Portfolio
 * Handles offline functionality, caching, and PWA features
 * Author: Lucas Caixeta
 * License: MIT
 */

const CACHE_VERSION = 1;
const CACHE_NAME = `lucas-caixeta-v${CACHE_VERSION}`;
const RUNTIME_CACHE = `${CACHE_NAME}-runtime`;
const IMAGE_CACHE = `${CACHE_NAME}-images`;

// Determine base path for GitHub Pages or local
const BASE_PATH = self.location.hostname === 'lucascaixeta.github.io' ? '/lucas_caixeta' : '';

// Critical resources to cache on install
const CRITICAL_ASSETS = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/assets/css/main.css`,
  `${BASE_PATH}/assets/css/modern.css`,
  `${BASE_PATH}/assets/fonts/FontAwesome.otf`,
  `${BASE_PATH}/images/favicon.png`
];

// Static assets that should be cached
const STATIC_ASSETS = [
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/assets/fonts/fontawesome-webfont.woff2`,
  `${BASE_PATH}/assets/fonts/fontawesome-webfont.woff`,
  `${BASE_PATH}/assets/fonts/fontawesome-webfont.ttf`
];

// Initialize all caches
const CACHE_STORES = [CACHE_NAME, RUNTIME_CACHE, IMAGE_CACHE];

/**
 * Install event - Cache critical resources
 */
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        console.log('Service Worker: Caching critical assets');
        return cache.addAll(CRITICAL_ASSETS);
      }),
      caches.open(RUNTIME_CACHE).then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
    ]).then(() => {
      self.skipWaiting(); // Force activation
    })
  );
});

/**
 * Activate event - Clean up old caches and claim clients
 */
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!CACHE_STORES.includes(cacheName)) {
            console.log(`Service Worker: Deleting old cache - ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      self.clients.claim(); // Take control of all pages
    })
  );
});

/**
 * Fetch event - Serve from cache, fallback to network
 * Strategy: Cache First for assets, Network First for HTML
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome extensions and external requests
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }

  // Strategy 1: Cache-First for Assets (CSS, JS, Fonts, Images)
  if (isAsset(url)) {
    event.respondWith(
      caches.match(request)
        .then((cached) => {
          if (cached) {
            // Update cache in background
            updateCacheInBackground(request);
            return cached;
          }
          return fetchAndCache(request, RUNTIME_CACHE);
        })
        .catch(() => getOfflineFallback())
    );
    return;
  }

  // Strategy 2: Network-First for HTML Documents
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Only cache successful responses
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(request)
          .then((cached) => cached || getOfflineFallback());
      })
  );
});

/**
 * Helper: Check if URL is an asset
 */
function isAsset(url) {
  const pathname = url.pathname;
  return /\.(js|css|woff|woff2|ttf|eot|otf|svg|png|jpg|jpeg|gif|ico)$/.test(pathname);
}

/**
 * Helper: Fetch and cache response
 */
function fetchAndCache(request, cacheName) {
  return fetch(request)
    .then((response) => {
      if (!response || response.status !== 200 || response.type === 'error') {
        return response;
      }
      
      const responseToCache = response.clone();
      caches.open(cacheName).then((cache) => {
        cache.put(request, responseToCache);
      });
      
      return response;
    });
}

/**
 * Helper: Update cache in background without waiting
 */
function updateCacheInBackground(request) {
  fetch(request)
    .then((response) => {
      if (response && response.status === 200) {
        caches.open(RUNTIME_CACHE).then((cache) => {
          cache.put(request, response);
        });
      }
    })
    .catch(() => {
      // Silently fail background updates
    });
}

/**
 * Helper: Get offline fallback page
 */
function getOfflineFallback() {
  return caches.match('/index.html')
    .then((response) => {
      if (response) {
        return response;
      }
      
      // If offline page is not cached, return a basic response
      return new Response(
        `<!DOCTYPE html>
         <html>
           <head>
             <title>Offline</title>
             <style>
               body { font-family: system-ui; text-align: center; padding: 50px; }
             </style>
           </head>
           <body>
             <h1>You are offline</h1>
             <p>Please check your internet connection.</p>
           </body>
         </html>`,
        {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/html'
          })
        }
      );
    });
}

/**
 * Background Sync - Reserved for future use
 */
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered -', event.tag);
  
  if (event.tag === 'sync-portfolio') {
    event.waitUntil(doBackgroundSync());
  }
});

/**
 * Background sync handler
 */
async function doBackgroundSync() {
  try {
    console.log('Service Worker: Performing background sync');
    // Add background sync logic here if needed
  } catch (error) {
    console.error('Service Worker: Background sync failed', error);
  }
}

/**
 * Message handler for communication with clients
 */
self.addEventListener('message', (event) => {
  const { type, payload } = event.data || {};
  
  if (type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (type === 'CLEAR_CACHE') {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        caches.delete(cacheName);
      });
    });
  }
});