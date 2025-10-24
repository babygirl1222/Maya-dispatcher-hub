
const CACHE_NAME = 'maya-hub-v1';
const ASSETS = [
  './','./index.html','./css/style.css','./js/app.js','./manifest.webmanifest',
  './assets/icon-192.png','./assets/icon-512.png',
  './assets/Dispatcher_Deck1_Basics_and_Call_Flow.pdf',
  './assets/Dispatcher_Deck2_Radio_Procedures_and_10_Codes.pdf',
  './assets/Dispatcher_Deck3_Geography_and_Jurisdiction.pdf',
  './assets/Dispatcher_Deck4_Legal_and_Documentation.pdf',
  './assets/Dispatcher_Deck5_Practice_Scenarios.pdf',
  './assets/Dispatcher_Deck6_Exam_Review.pdf',
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k!==CACHE_NAME ? caches.delete(k) : null)))); self.clients.claim(); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); });
