let compoStats = (function() {
  
  let SELF = {
    Deposit,
    Spend,
    SetGold,
    GetGold,
    Commit,
    RestoreData,
  };
  
  let data = {
    gold: 0
  };
  
  function RestoreData(restoredData) {
    if (restoredData) {
      data = restoredData;
    }
  }
  
  function SetGold(amount) {
    data.gold = Math.max(0, amount);
  }
  
  function GetGold() {
    return Math.floor(data.gold * 100) / 100;
  }
  
  function Spend(amount) {
    data.gold = Math.max(0, data.gold - amount);
  }
  
  function Deposit(amount) {
    data.gold += amount;
  }
  
  function Commit() {
    let componentStorageKey = 'compoStats';
    appData.SetComponentData(componentStorageKey, data);
  }
  
  return SELF;
  
})();