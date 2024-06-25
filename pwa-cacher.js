let pwaCacher = (function() {
  
  let SELF = {
    Cache,
    ClearCache,
  };
  
  let local = {
    cacheName: 'goldheroes',
  };
  
  function Cache() {
    
    fetch('manifest-cache.json')
    .then(res => res.json())
    .then(json => {
      
      let cacheURLs = extractUrlsFromJson(json);
  
      caches.delete(local.cacheName)
      .then(() => {
        caches.open(local.cacheName)
        .then(function(cache) {
          return Promise.all(
            cacheURLs.map(function(url) {
              return cache.add(url).catch(function(error) {
                console.error('Failed to cache URL:', url, error);
              });
            })
          );
        })
        .then(function() {
          alert('Done! Reload to take effect.');
        })
        .catch(function(error) {
          alert('Failed. Check console.');
        });
      });
      
    
    });
  };
  
  function extractUrlsFromJson(json) {
    let urls = [];
    for (let key in json) {
      if (Array.isArray(json[key])) {
        urls = urls.concat(json[key]);
      }
    }
    return urls;
  }
    
  function ClearCache() {
    let isConfirm = window.confirm('Are you sure?');
    if (!isConfirm) return;
    
    caches.delete(local.cacheName)
      .then(() => {
          alert('Done! Reload to take effect.');
      });
  };
  
  return SELF; 
  
})();