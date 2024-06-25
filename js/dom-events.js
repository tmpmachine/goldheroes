let DOMEvents = (function() {
    
  let eventsMap = { 
    onclick: {
      'navigate-screens': (evt) => ui.NavigateScreens(evt),
      'clear-app-data': () => app.ClearAppData(),
    	'handle-click-reward': (evt) => uiReward.HandleClickList(evt),
    	'handle-click-inventory': (evt) => uiInventory.HandleClickList(evt),
    	'deposit': () => ui.Deposit(),
    	'edit': () => ui.Edit(),
    	'backup': () => ui.BackupData(),
    	'restore': () => ui.RestoreData(),
    	'add-reward': () => uiReward.AddReward(),
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