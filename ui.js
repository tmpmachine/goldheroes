let ui = (function() {
  
  let $ = document.querySelector.bind(document);
  
  let SELF = {
    Init,
    Deposit,
    HandleClickList,
    Edit,
    AddReward,
  };
  
  let listContainer = new ListContainerBuilder({
    container: '._listRewards',
    template: '#tmp-reward',
    builder: (node, item) => buildListItem(node, item),
    lookup: (containerEl, item) => containerEl.querySelector(`[data-id="${item.id}"]`),
  });
  
  // # dom events
  function handleClickAction(itemEl, action) {
    
    let data = {
      id: itemEl.dataset.id,
    };
    
    // # events map
    switch (action) {
      case 'buy': buy(data.id); break;
      case 'remove': remove(data.id); break;
    }
    
  }
  
  function Edit() {
    let gold = compoStats.GetGold();
    
    let userVal = window.prompt('Value', gold);
    if (userVal === null) return;
    
    compoStats.SetGold(parseFloat(userVal));
    
    compoStats.Commit();
    appData.Save();
    
    refreshGold();
  }
  
  function remove(id) {
    let isConfirm = window.confirm('Are you sure?');
    if (!isConfirm) return;

    compoReward.server.RemoveItem(id);
    
    compoReward.Commit();
    appData.Save();
    
    refreshReward();
  }
  
  function buy(id) {
    let gold = compoStats.GetGold();
    let item = compoReward.server.GetById(id);
    if (!item) return;
    
    if (gold - item.price < 0) return;
    
    let isConfirm = window.confirm('Buy this reward?');
    if (!isConfirm) return;
    
    compoStats.Spend(item.price);
    compoInventory.Add(item);
    
    compoInventory.Commit();
    compoStats.Commit();
    appData.Save();
    
    refreshGold();
    uiInventory.RefreshList();
  }
  
  function foo(data) {
      console.log('play', data);
  }
  
  function HandleClickList(evt) {
    let targetEl = evt.target;
    let itemEl = targetEl?.closest('[data-kind="item"]');
    let action = targetEl?.closest('[data-action]')?.dataset.action;
    
    if (!itemEl) return;
  
    handleClickAction(itemEl, action);
  }
  
  function buildListItem(node, item) {
    let itemEl = node.querySelector('[data-kind="item"]') ?? node;
    itemEl.dataset.id = item.id;
    itemEl.querySelector('.name').replaceChildren(item.name);
    itemEl.querySelector('.price').replaceChildren(item.price);
    return itemEl;
  }

  function AddReward() {
    let userVal = window.prompt('Reward name');
    if (userVal === null) return;
    
    let price = window.prompt('Reward price');
    if (price === null) return;
    
    compoReward.Add(userVal, parseInt(price));
    
    compoReward.Commit();
    appData.Save();
    
    refreshReward();
  }
  
  function refreshReward() {
    let items = compoReward.server.GetAll();
    
    listContainer.Refresh(items);
  }
  
  function Deposit() {
    let userVal = window.prompt('Value');
    if (userVal === null) return;
    
    compoStats.Deposit(parseFloat(userVal));
    
    compoStats.Commit();
    appData.Save();
    
    refreshGold();
  }
  
  function refreshGold() {
    let gold = compoStats.GetGold();
    $('._txtGold').replaceChildren(`${gold}`);
  }
  
  function Init() {
    DOMEvents.Init();
    
    refreshGold();
    refreshReward();
    uiInventory.RefreshList();
  }
  
  return SELF;
  
})();