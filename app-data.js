let appData = (function() {
  
  let SELF = {
    SetComponentData,
    Save,
    Restore,
    Clear,
  };
  
  let data = {
    components: {
      compoReward: null,
      compoStats: null,
    }
  };
  
  function Clear() {
    localStorage.removeItem('goldheroes-data');
  }
  
  function Restore() {
    let defaultDataJSON = JSON.stringify(data);
    data = JSON.parse(localStorage.getItem('goldheroes-data') ?? defaultDataJSON);
    
    compoReward.RestoreData?.(data.components.compoReward);
    compoStats.RestoreData?.(data.components.compoStats);
    compoInventory.RestoreData?.(data.components.compoInventory);
  }
  
  function SetComponentData(key, componentData) {
    data.components[key] = componentData;
  }
  
  function Save() {
    localStorage.setItem('goldheroes-data', JSON.stringify(data));
  }
  
  return SELF;
  
})();