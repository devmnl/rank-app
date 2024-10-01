// Nome do cache
const CACHE_NAME = 'my-app-cache-v1';
// Arquivos a serem armazenados em cache
const URLS_TO_CACHE = [
    '/',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
          console.log('Cache aberto com sucesso');
          return cache.addAll(URLS_TO_CACHE).catch((error) => {
              console.error('Erro ao adicionar itens ao cache:', error);
          });
      })
  );
});

// Ativando o Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Cache removido:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptando as requisições
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Retorna a resposta do cache se existir, senão faz a requisição de rede
                return response || fetch(event.request);
            })
    );
});
