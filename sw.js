const CACHE_NAME = 'balance-checker-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Install - cache everything immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching app files...');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate - clear old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      ).then(() => self.clients.claim());
    })
  );
});

// Fetch - cache first, network fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      // If we have it cached, return that immediately
      if (cached) {
        return cached;
      }
      // Otherwise try the network
      return fetch(event.request).then((response) => {
        // Don't cache non-OK responses
        if (!response || !response.ok) return response;

        // Cache any successful response we fetch
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clone);
        });
        return response;
      });
    }).catch(() => {
      // Network failed AND nothing in cache - return a simple offline fallback
      return new Response(
        '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Offline</title><style>body{background:#0a0a0a;color:#00ff41;font-family:monospace;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;text-align:center;padding:20px}h1{font-size:24px}p{color:#a0a0a0;margin-top:16px}</style></head><body><div><h1>You are offline</h1><p>Please check your connection and try again.</p></div></body></html>',
        { headers: { 'Content-Type': 'text/html' } }
      );
    })
  );
});
