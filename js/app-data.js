let appData = (function() {
  
  let SELF = {
    SetComponentData,
    Save,
    Restore,
    Clear,
    Export,
  };
  
  let data = {
    components: {
      compoReward: null,
      compoStats: null,
    }
  };
  
  function Export() {
    return JSON.stringify(data);
  }
  
  function Clear() {
    localStorage.removeItem('goldheroes-data');
  }
  
  function Restore(backupDataJSON) {
    let defaultDataJSON = JSON.stringify(data);
    data = JSON.parse(backupDataJSON ?? localStorage.getItem('goldheroes-data') ?? defaultDataJSON);
    
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