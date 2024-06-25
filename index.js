import { loadScripts } from './script-loader.js';

// load files
(function() {

  loadScripts([
    {
      urls: [
        "js/view-states-map.js",
        "js/utils/view-state-util.js",
        "js/utils/screen-state-util.js",
        "js/dom-events.js",
        "js/utils/wait.js",
        "js/ui.js",
      ],
      callback: function() {
        viewStateUtil.Init(viewStatesMap);
        ui.Init();
      }
    },
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
        "js/components/inventory-component.js",
        "js/components/reward-component.js",
        "js/components/stats-component.js",
        "js/uis/inventory-ui.js",
        "js/uis/reward-ui.js",
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