let app = (function() {
  
  let SELF = {
    Init,
    ClearAppData,
  };
  
  function Init() {
    appData.Restore();
    
    ui.RefreshGold();
    uiReward.RefreshList();
    uiInventory.RefreshList();
  }
  
  function ClearAppData() {
    let isConfirm = window.confirm('Are you sure?');
    if (!isConfirm) return;

    appData.Clear();
    alert('Success. Reload app.');
  }
  
  return SELF;
  
})();