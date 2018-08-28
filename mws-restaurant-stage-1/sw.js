/* Service worker */

self.addEventListener('fetch', function (event) {

    // Cache visited pages:
    const reqUrl = event.request.url;
    if (reqUrl.includes('restaurant.html?id=')) {
        const id = reqUrl.substr(reqUrl.length - 1);
        caches.open(staticCacheName).then(function (cache) {
            cache.addAll([
                '/restaurant.html?id=' + id,
            ]);
        });
    } else if (reqUrl.startsWith('https://api.tiles.mapbox.com/v4/mapbox.streets') || reqUrl.endsWith('.jpg')) {
        caches.open(staticCacheName).then(function (cache) {
            cache.addAll([
                reqUrl,
            ]);
        });
    }

    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);

        }).catch(function () {
            return new Response('Uh oh, that totally failed!');
        })
    );
});

const staticCacheName = 'mws-restaurant-static-v1';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            cache.addAll([
                '/',
                '/index.html',
                '/restaurant.html',
                '/css/styles.css',
                '/css/responsive.css',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/js/dbhelper.js',
                '/data/restaurants.json',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
                'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png',
                'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon-2x.png'
            ]);

            return cache;
        })
    );
});