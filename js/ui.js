let ui = (function() {
  
  let $ = document.querySelector.bind(document);
  
  let SELF = {
    Init,
    Deposit,
    Edit,
    RefreshGold,
    BackupData,
    RestoreData,
    NavigateScreens,
  };
  
  function NavigateScreens(evt) {
    let btnEl = evt.target;
    let screenName = btnEl.dataset.target;
    
    screenStateUtil.NavigateTo(screenName);
  }
  
  function BackupData() {
    let data = appData.Export();
    let blob = new Blob([data], {type: 'application/json'});
    let url = URL.createObjectURL(blob);
    
    let el = document.createElement('a');
    el.href = url;
    el.target = '_blank';
    el.download = `goldheroes-backup-${Date.now().toString()}.json`;
    el.onclick = function() {
      el.remove();
    };
    document.body.append(el);
    el.click();
  }
  
  function RestoreData() {
    let input = document.createElement('input');
    input.type ='file';
    input.onchange = function() {
      let file = input.files[0];
      let reader = new FileReader();
      reader.onload = async function(evt) {
        let backupDataJSON = evt.target.result;
        appData.Restore(backupDataJSON);
        
        appData.Save();
        Init();
      };
      reader.readAsText(file);
    };
    
    document.body.append(input);
    input.click();
    input.remove();
  }
  
  function Edit() {
    let gold = compoStats.GetGold();
    
    let userVal = window.prompt('Value', gold);
    if (userVal === null) return;
    
    compoStats.SetGold(parseFloat(userVal));
    
    compoStats.Commit();
    appData.Save();
    
    RefreshGold();
  }
  
  
  function HandleClickList(evt) {
    let targetEl = evt.target;
    let itemEl = targetEl?.closest('[data-kind="item"]');
    let action = targetEl?.closest('[data-action]')?.dataset.action;
    
    if (!itemEl) return;
  
    handleClickAction(itemEl, action);
  }
  
  function Deposit() {
    let userVal = window.prompt('Value');
    if (userVal === null) return;
    
    compoStats.Deposit(parseFloat(userVal));
    
    compoStats.Commit();
    appData.Save();
    
    RefreshGold();
  }
  
  function RefreshGold() {
    let gold = compoStats.GetGold();
    $('._txtGold').replaceChildren(`${gold}`);
  }
  
  function Init() {
    DOMEvents.Init();
  }
  
  return SELF;
  
})();