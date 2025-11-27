const CACHE_NAME = 'prahlad-portfolio-v1';
const ASSETS = [
  './',
  './index.html',
  './css/custom.css',
  './js/main.js',
  './js/github-api.js',
  './js/ai-chat.js',
  './js/three-carousel.js',
  './js/particles.js',
  './assets/avatar.jpg',
  './assets/og-preview.jpg',
  './assets/screenshots/calc.jpg',
  './assets/screenshots/dsa.jpg',
  './assets/screenshots/tutorial.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});



