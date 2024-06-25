import { loadScripts } from './script-loader.js';

// load files
(function() {

  loadScripts([
    {
      urls: [
        "js/utils/data-server.js",
        "js/utils/list-container-builder.js",
      ],
    },
    {
      urls: [
        "js/app.js",
        "js/app-data.js",
        "js/dom-events.js",
        "js/components/inventory-component.js",
        "js/components/reward-component.js",
        "js/components/stats-component.js",
        "js/ui.js",
        "js/uis/inventory-ui.js",
      ],
      callback: function() {
        app.Init();
      }
    },
  ]);
  
})();

// register service worker
if (typeof(navigator) !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(function(swo) {
    console.info('Service worker registerd successfully');
  }).catch(function(e) {
    console.error(e);
  });
}