// Service worker RCTT Heppignies
// Met en cache la page d'entrée et les icônes (démarrage rapide).
// Les données viennent d'Apps Script et nécessitent Internet.
const CACHE = 'rctt-v3';   // changer en v2, v3… à chaque modification de ces fichiers
const FICHIERS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './favicon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cles =>
      Promise.all(cles.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;   // Apps Script : toujours en direct
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
