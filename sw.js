const cacheName = 'dzikir-v4.0'; // <--- NAIKKAN VERSI SETIAP ADA PERUBAHAN (v1 ke v2, dst)
const assets = [
  './',
  './index.html',
  './manifest.json'
];

// Tahap Install: Simpan file ke cache
self.addEventListener('install', e => {
  self.skipWaiting(); // Memaksa SW baru langsung aktif tanpa menunggu tab ditutup
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
});

// Tahap Activate: HAPUS CACHE LAMA
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName)
            .map(key => caches.delete(key)) // Menghapus v1 saat v2 masuk
      );
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});