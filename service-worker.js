/**
 * The name of the cache used for storing course modules.
 * @type {string}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/open}
 */
const CACHE_NAME = 'course-modules-selector-cache';

/**
 * The version of the cache to handle updates.
 * @type {string}
 */
const CACHE_VERSION = 'v1';

/**
 * Event listener for the 'install' event, responsible for caching initial resources.
 * @param {Event} event - The 'install' event object.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Events/install}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Cache/addAll}
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(`${CACHE_NAME}-${CACHE_VERSION}`).then((cache) => {
      return cache.addAll([
        // Add additional URLs to cache here if needed
      ]);
    })
  );
});

/**
 * Event listener for the 'activate' event, responsible for cleaning up old caches.
 * @param {Event} event - The 'activate' event object.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Events/activate}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/keys}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/delete}
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName.startsWith(CACHE_NAME) && cacheName !== `${CACHE_NAME}-${CACHE_VERSION}`) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

/**
 * Event listener for the 'fetch' event, responsible for handling network requests.
 * @param {FetchEvent} event - The 'fetch' event object.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Events/fetch}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith}
 */
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Handle API requests
  if (request.url.includes('/api/v1/courses/')) {
    event.respondWith(handleApiRequest(request));
  } else {
    // For non-API requests, use default fetch behavior
    event.respondWith(fetch(request));
  }
});

/**
 * Handles API requests by checking the cache and fetching resources as needed.
 * @param {Request} request - The request object.
 * @returns {Promise<Response>} A promise that resolves with the response.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Cache/match}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Cache/put}
 */
async function handleApiRequest(request) {
  const cache = await caches.open(`${CACHE_NAME}-${CACHE_VERSION}`);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    // If response is in cache, return it
    return cachedResponse;
  } else {
    // If response is not in cache, fetch and cache the response
    const response = await fetch(request);
    cache.put(request, response.clone());

    return response;
  }
}

