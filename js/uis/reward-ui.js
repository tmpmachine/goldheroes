let uiReward = (function() {
  
  let $ = document.querySelector.bind(document);
  
  let SELF = {
    HandleClickList,
    AddReward,
    RefreshList,
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
      case 'edit': edit(data.id); break;
    }
    
  }
  
  function edit(id) {
    let item = compoReward.server.GetById(id);
    if (!item) return;
    
    let {name, price} = item;
    let userVal = window.prompt('Reward name', name);
    if (userVal === null) return;
    
    let priceInput = window.prompt('Reward price', price);
    if (priceInput === null) return;
    
    let updatedItem = compoReward.Update(id, {
      name: userVal,
      price: parseInt(priceInput),
    });
    
    compoReward.Commit();
    appData.Save();
    
    listContainer.RefreshSingle(updatedItem);
  }
  
  function remove(id) {
    let isConfirm = window.confirm('Are you sure?');
    if (!isConfirm) return;

    compoReward.server.RemoveItem(id);
    
    compoReward.Commit();
    appData.Save();
    
    RefreshList();
  }
  
  function refreshSingleListItem(id) {
    let item = compoReward.server.GetById(id);
    if (!item) return;
    
    listContainer.RefreshSingle(item);
  }
  
  function buy(id) {
    let gold = compoStats.GetGold();
    let item = compoReward.server.GetById(id);
    if (!item) return;
    
    if (gold - item.price < 0) return;
    
    let isConfirm = window.confirm('Buy this reward?');
    if (!isConfirm) return;
    
    compoStats.Spend(item.price);
    compoReward.IncreaseBuyCount(item.id);
    compoInventory.Add(item);
    
    compoInventory.Commit();
    compoStats.Commit();
    appData.Save();
    
    ui.RefreshGold();
    uiInventory.RefreshList();
    refreshSingleListItem(item.id);
  }
  
  
  // # builder
  function buildListItem(node, item) {
    let itemEl = node.querySelector('[data-kind="item"]') ?? node;
    itemEl.dataset.id = item.id;
    itemEl.querySelector('.name').replaceChildren(item.name);
    itemEl.querySelector('.price').replaceChildren(item.price);
    if (item.buyCount > 0) {
      itemEl.querySelector('.buy-count-info').replaceChildren(`Claimed ${item.buyCount} times`);
    }
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
    
    RefreshList();
  }
  
  function RefreshList() {
    let items = compoReward.server.GetAll();
    
    listContainer.Refresh(items);
  }
  
  function HandleClickList(evt) {
    let targetEl = evt.target;
    let itemEl = targetEl?.closest('[data-kind="item"]');
    let action = targetEl?.closest('[data-action]')?.dataset.action;
    
    if (!itemEl) return;
  
    handleClickAction(itemEl, action);
  }
  
  return SELF;
  
})();