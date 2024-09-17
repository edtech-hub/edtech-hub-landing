'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/COMMIT_EDITMSG": "a8297d555dd34879e8e48e1cf12acefa",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/sendemail-validate.sample": "4d67df3a8d5c98cb8565c07e42be0b04",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/pre-commit.sample": "305eadbbcd6f6d2567e033ad12aabbc4",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/config": "6d709b00889b7e7477d9ce7347b27192",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/objects/3a/7525f2996a1138fe67d2a0904bf5d214bfd22c": "ab6f2f6356cba61e57d5c10c2e18739d",
".git/objects/d5/bb50b3c3bc534b51ba035a5e8495ba7af5025b": "81d30e6f235d2cd1960b1a0d917b3043",
".git/objects/d5/a56c410b43ef5c4c3dfd1362622907616f83bd": "197102c73e4a4e1c4ffa50c6236a06d5",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/31/db60c9d1128e9645603e7e7bc073402603da18": "d2876c183378bd952443b08ebb551bc2",
".git/objects/08/32d0db2def1613c1c45aa4fe9156a1c6b7d589": "e05df183e5eeaddf39672a2516f9c41d",
".git/objects/e8/33c0ecfba742e902d45e8876ba29b92b5f3259": "0754e662cb703c68e89d66689450647e",
".git/objects/f4/456b826077f8a22896999c08be446948ce5f1d": "6c328b3204149a61817612cb458bee04",
".git/objects/f4/37b3bbd207b8da4d3641391e6dd3eeca242fc9": "42b4c24c5a78aca8caafdda144e42116",
".git/objects/cd/5690414d187fcb5647b080fadbd0160b72c1e3": "eb42cb33f1e69cb44b971277ff5c70ec",
".git/objects/90/bcfcf0a77ab618a826db0fd8b0942963b653af": "fc109675cdf1233dd6599a4c3c0a7a69",
".git/objects/68/7c2ec1a83055d6861a2270e73c710d52ba8dd1": "04a0535d163c333a77e52fc99dddcc08",
".git/objects/b1/5ad935a6a00c2433c7fadad53602c1d0324365": "8f96f41fe1f2721c9e97d75caa004410",
".git/objects/a9/6098b1a3cdc4b828ed7ccd3f92cd46be157d1c": "31d347fae32b57e4b884fb24aca0474a",
".git/objects/ba/5317db6066f0f7cfe94eec93dc654820ce848c": "9b7629bf1180798cf66df4142eb19a4e",
".git/objects/95/e5314726dd3edba855f2560ab1dec191331493": "b6f1dcfec2860c6306ac06e42021534d",
".git/objects/ff/1ea5bcd364a56637b58e04a7ce1d2a2213c094": "46b7fd3097c62dc1270956795fbda3bf",
".git/objects/7a/30a26be04dac9c69e3da59df10847c2f185260": "14e0465e9b17257019267a25423fd065",
".git/objects/25/8b3eee70f98b2ece403869d9fe41ff8d32b7e1": "05e38b9242f2ece7b4208c191bc7b258",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/e3/6f966cedd6403af8a0919415b1d24f638c64b8": "dfb6f10d9e70166c19d61a6121546f29",
".git/objects/6b/e909fbf40b23748412f0ea89bf0fae827ed976": "5f118419157d9534688915220cc803f7",
".git/objects/46/4ab5882a2234c39b1a4dbad5feba0954478155": "2e52a767dc04391de7b4d0beb32e7fc4",
".git/objects/8d/96c25ecad277c9c0462615e22972550e72470b": "b301b35e3212843aab7c1e2f939032e4",
".git/objects/d0/23371979cf1e985205df19078051c10de0a82d": "700b71074bad7afee32068791dec7442",
".git/objects/32/aa3cae58a7432051fc105cc91fca4d95d1d011": "4f8558ca16d04c4f28116d3292ae263d",
".git/objects/1f/45b5bcaac804825befd9117111e700e8fcb782": "7a9d811fd6ce7c7455466153561fb479",
".git/objects/1f/63fd8e7b354e8e7d02928617c43868d3a922c5": "4767bd5863b4e5237508404f2346e41a",
".git/objects/dc/1647d3ebcdab0b8651866e71512ac320679e7d": "62bc0c78a16724e0b69a53ee957b2113",
".git/objects/04/ed0e66f1a95baf3def7b38004248cd835a01b6": "24ac18b1481c64419490b3690ea67f03",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/26/e109ef295b0ef1ea5794f8c14966ae3211c704": "52adc7d4290c9653ba698673b49c83ae",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/d6/f470dd82740f091186ccbbbab24a27170b5770": "bc16c87eafa1964e8ade5afa728541ec",
".git/objects/85/6a39233232244ba2497a38bdd13b2f0db12c82": "eef4643a9711cce94f555ae60fecd388",
".git/objects/1d/76e2820a739c03ec99d952ea2b83419be3ada2": "c3a330cb69d90a5b8bb56337b6510adc",
".git/objects/da/fd65422747502c19b5c74b4230282644d2169c": "d8a62caf99a372ff6c7692e143787ce3",
".git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/28/7b91747caf728b53b0f913ee3cf6ca995a4385": "32a7941826dc938efcfec03800d9520d",
".git/objects/8b/23505bae4fcb5658b5c2b29280a54b0e902e8b": "3056d7121cc6d394a8b83510d45ac470",
".git/objects/6f/847b7b2958638e587c36f3ae602257efa95eea": "624aa2cec20103bf8589d41d1349d8c7",
".git/objects/84/0516208d35dcb4298847ab835e2ef84ada92fa": "36a4a870d8d9c1c623d8e1be329049da",
".git/objects/98/57c9b3b0448c92818efc5fda0f206b21914168": "ecbde07c564dabbec0f249821051b8af",
".git/objects/01/f72cdb69c7bac6aa41ebe38b826f0bd74edb79": "6403e199512f52591269a63a94c83b9f",
".git/objects/86/d607387df9fa7936fc1bd689b36b6c07b6c9fe": "0b2a056a7bd5b13dfa022e44c24e2a83",
".git/objects/44/a8b8e41b111fcf913a963e318b98e7f6976886": "5014fdb68f6b941b7c134a717a3a2bc6",
".git/objects/f2/04823a42f2d890f945f70d88b8e2d921c6ae26": "6b47f314ffc35cf6a1ced3208ecc857d",
".git/objects/ad/b6111d028ebe903e509ab6f6aa1a2bf4ed52b0": "ef92917384e50247d346a37a96386eda",
".git/objects/29/448141ec0727784a52711db9cc0a142d2605e2": "dc6dc2ac78d8ed3731fc0f7b1034c76e",
".git/objects/29/9c0c7edfb936d2aeb99963a7ef864bb679d3a9": "7dc492fef71414ae0471c5fcdf165e64",
".git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391": "c70c34cbeefd40e7c0149b7a0c2c64c2",
".git/objects/e6/f96047ffe35bd3b60d1d3d0997aa5fdb60ba7f": "4bebd4e6436af1c434326f78be268420",
".git/objects/f6/d26948641123a5278fffbba8afd8d108065983": "90a3d2f124a0f916bcfde1ba72ab6cc2",
".git/objects/88/3094e49f8f5f8a24e7b0895fb3cec4e457bd74": "70bd16ef66ecdfd89604c8ea75a58f53",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/40/0d5b186c9951e294699e64671b9dde52c6f6a0": "f6bd3c7f9b239e8898bace6f9a7446b9",
".git/logs/HEAD": "966e8b0652aca49e77603ef7c32ffa8e",
".git/logs/refs/heads/main": "5afebacf5f9f42b6bbbca6bb493ea7e5",
".git/refs/heads/main": "2eba99d5145635035ee11b10f9027fdd",
".git/index": "9c05b3836b3587e957d9c231abf47833",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
"version.json": "245fefb4a0cc0ef0eee8d25320227a84",
"assets/fonts/MaterialIcons-Regular.otf": "935c565c24d23fafa1b8b5b5cf9c682a",
"assets/assets/ed_astra_lt.png": "302e7523b3b5a339b2000c8a3c6e5614",
"assets/assets/ed_astra_dkt.png": "0ac44f68e8e71fba058ea76e425603c7",
"assets/assets/badminton.jpg": "7c8dcf062b63d73e9a763f00e060c459",
"assets/assets/badminton.jpeg": "0891436d4f1d446d41ca935cda8737f7",
"assets/assets/person_outlined.png": "072166b07decc640cd88a428e3412513",
"assets/assets/pussy_cat_lt.png": "de24aca68f943425b45f3dfc7aa53432",
"assets/assets/background.jpg": "2005b23bf58cb60d7709fdfeddc6bf0f",
"assets/assets/pussy_cat.png": "2f92bdfbb0941b2028c588c5d5de7794",
"assets/assets/lady_outlined.png": "fa4e3c104e8612bcc9a90df2d5054ca3",
"assets/assets/404.png": "046670ceac1b546e9e6e3d2a76221bce",
"assets/assets/default_banner.png": "97d66bb2a601e750fcb72df4e1ad74d9",
"assets/assets/background_light.jpg": "07fa676921ba3bdc67a94919cdb13b12",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/NOTICES": "d39062a79d0eafe012b1186b78f1cd8d",
"assets/AssetManifest.bin.json": "e15e2ba0ba742e3a17c3794c508e5043",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "40769755cfef68d4c2a9a0dd92f1b3dd",
"assets/AssetManifest.json": "f8db10d0bf44bed16de1c5bfecf8b764",
"flutter_bootstrap.js": "c3367d7e19477a64886bad41260048d8",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"main.dart.js": "0954cfafe095b5a2a7b95cde9ad460cc",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"index.html": "d22c681e0d7733977eab886adac9f6da",
"/": "d22c681e0d7733977eab886adac9f6da",
"README.md": "d41d8cd98f00b204e9800998ecf8427e",
"manifest.json": "cc46981f73a1117282b46aabf50fba8d"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
