const CACHE_PREFIX = 'bigtrip-cache';
const CACHE_VERSION = 'v14';
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VERSION}`;

const HTTP_STATUS_OK = 200;
const RESPONSE_SAVE_TYPE = 'basic';

self.addEventListener('install', (evt) => {
  evt.waitUntil( // гарантирует, что действия будут выполнены до завершения события install, если не сделать, то SW не будет зарегистрирован
    caches.open(CACHE_NAME) // получаем доступ к хранилищу кешей, возвращает промис
      .then((cache) => cache.addAll([
        '/',
        '/favicon.ico',
        '/index.html',
        '/bundle.js',
        '/css/style.css',
        '/fonts/Montserrat-Bold.woff2',
        '/fonts/Montserrat-ExtraBold.woff2',
        '/fonts/Montserrat-Medium.woff2',
        '/fonts/Montserrat-Regular.woff2',
        '/fonts/Montserrat-SemiBold.woff2',
        '/img/header-bg.png',
        '/img/header-bg@2x.png',
        '/img/logo.png',
        '/img/icons/bus.png',
        '/img/icons/check-in.png',
        '/img/icons/drive.png',
        '/img/icons/flight.png',
        '/img/icons/restaurant.png',
        '/img/icons/ship.png',
        '/img/icons/sightseeing.png',
        '/img/icons/taxi.png',
        '/img/icons/train.png',
        '/img/icons/transport.png',
      ]))
  );
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    // получим все названия кешей
    caches.keys()
      .then(
        // перебираем их и составляем набор промисов на удаление
        (keys) => Promise.all(
          keys.map(
            (key) => {
              //удаляем только те кеши
              // которые начинаются с нашего префикса
              // но не совпадают по версии
              if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
                return caches.delete(key);
              }
              // остальное не обрабатываем
              return null;
            }).filter((key) => key !== null)
        )
      )
  );
});

const handleFetch = (evt) => {
  const {request} = evt;

  evt.respondWith(
    caches.match(request)
      .then((cacheResponse) => {
        //если в кеше нашелся ответ на запрос
        // возврашаем его вместо запроса к серверу
        if (cacheResponse) {
          return cacheResponse;
        }
        // Если в кеше не нашелся запрос, то повторно вызываем fetch
        // с тем-же запросов request
        // И возвращаем его
        return fetch(request)
          .then((response) => {
            // Если ответа нет или ответ со статусом отличным от 200
            // Или ответ не безопасного типа (не basic), то просто
            // передаем ответ дальше, никак не обрабатывая
            if (!response || response.status !== HTTP_STATUS_OK || response.type !== RESPONSE_SAVE_TYPE) {
              return response;
            }
            // Если ответ удовлетворяем условиям возвращаем его клон
            const clonedResponse = response.clone();
            // Копию кладем в кеш
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(request, clonedResponse));
            // Оригинал передаем дальше
            return response;
          });
      })
  );
};

self.addEventListener('fetch', handleFetch);
