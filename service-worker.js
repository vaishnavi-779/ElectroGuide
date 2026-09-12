const CACHE_NAME = 'electroguide-v1';
const APP_SHELL = [
  './', './index.html', './component.html', './quiz.html', './games.html',
  './designer.html', './simulator.html', './tools.html', './learn.html', './projects.html',
  './style.css', './features.css', './mobile.css', './lab-tools.css',
  './data.js', './board-details.js', './script,js', './features.js', './chatbot.js',
  './games.js', './games-help.js', './progress.js', './designer.js', './simulator.js',
  './tools.js', './learn-notes.js', './projects-data.js', './app-icon.svg', './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});