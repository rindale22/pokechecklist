const C='pkm-v1';
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon.svg']))));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(hit=>{
    const net=fetch(e.request).then(r=>{if(r.ok||r.type==='opaque'){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>hit);
    return hit||net}));
});
