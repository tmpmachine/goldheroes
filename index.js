app.Init();

(function() {

  if (typeof(navigator) !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function(swo) {
      console.info('Service worker registerd successfully');
    }).catch(function(e) {
      console.error(e);
    });
  }
  
})();