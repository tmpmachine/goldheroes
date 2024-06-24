let DOMEvents = (function() {
    
  let eventsMap = { 
    onclick: {
      'clear-app-data': () => app.ClearAppData(),
    	'handle-click-list': (evt) => ui.HandleClickList(evt),
    	'handle-click-inventory': (evt) => uiInventory.HandleClickList(evt),
    	'deposit': () => ui.Deposit(),
    	'edit': () => ui.Edit(),
    	'add-reward': () => ui.AddReward(),
    },
  }; // to do
  
  let listening = function(selector, dataKey, eventType, callbacks) {
    let elements = document.querySelectorAll(selector);
    for (let el of elements) {
      let callbackFunc = callbacks[el.dataset[dataKey]];
      el.addEventListener(eventType, callbackFunc);
    }
  };
  
  function Init() {
    listening('[data-onclick]', 'onclick', 'click', eventsMap.onclick);
  }
  
  return {
    Init,
  };

})();