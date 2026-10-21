/* Champions Training offline cache. Scope is the game page only (registered with scope = the page URL),
   so no other hub page is affected. Holds the encrypted page and the web fonts; contains no private data.
   Page: network first (so updates arrive when online), cache when offline. Fonts: cache first. */
const CACHE = 'champions-v1';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('champions-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('message', e => {
  if (e.data === 'cache-page') e.waitUntil(cachePage());
});
async function cachePage() {
  const url = new URL('champions-h9k2m7.html', self.registration.scope).href;
  try { const r = await fetch(url, { cache: 'no-cache' }); if (r.ok) await (await caches.open(CACHE)).put(url, r); } catch (_) {}
}
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (req.mode === 'navigate' || url.pathname.endsWith('/champions-h9k2m7.html')) {
    const key = url.origin + url.pathname;               // ignore ?cache-busters and #screens
    e.respondWith((async () => {
      const c = await caches.open(CACHE);
      try {
        const r = await fetch(key, { cache: 'no-cache' });   // always revalidate with GitHub, never a stale HTTP-cache copy
        if (r.ok) c.put(key, r.clone());
        return r;
      } catch (_) {
        return (await c.match(key)) || new Response('Offline and not cached yet. Open the game once with internet.', { status: 503, headers: { 'content-type': 'text/plain' } });
      }
    })());
    return;
  }
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith((async () => {
      const c = await caches.open(CACHE);
      const hit = await c.match(req);
      if (hit) return hit;
      try { const r = await fetch(req); c.put(req, r.clone()); return r; } catch (_) { return new Response('', { status: 504 }); }
    })());
  }
});
