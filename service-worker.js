// 强制立即接管旧版本
self.addEventListener('install', event => {
  self.skipWaiting();
});

// 让新版本立即控制所有客户端
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

// 不缓存任何文件（始终使用最新版本）
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
