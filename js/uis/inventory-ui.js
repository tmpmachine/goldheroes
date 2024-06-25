let uiInventory = (function() {
  
  let $ = document.querySelector.bind(document);
  
  let SELF = {
    HandleClickList,
    RefreshList,
  };
  
  let listContainer = new ListContainerBuilder({
    container: '._listInventory',
    template: '#tmp-inventory',
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
      case 'use': use(data.id); break;
      case 'remove': remove(data.id); break;
    }
    
  }
  
  function remove(id) {
    let item = compoInventory.server.GetById(id);
    if (!item) return;
    
    let isConfirm = window.confirm('Are you sure?');
    if (!isConfirm) return;
    
    compoInventory.server.RemoveItem(item.id);    
    
    compoInventory.Commit();
    appData.Save();
    
    RefreshList();
  }
  
  function use(id) {
    let item = compoInventory.server.GetById(id);
    if (!item) return;
    
    let isConfirm = window.confirm('Are you sure?');
    if (!isConfirm) return;
    
    if (item.stock == 1) {
      compoInventory.server.RemoveItem(item.id);    
    } else {
      compoInventory.ReduceStock(item.id);    
    }
    
    compoInventory.Commit();
    appData.Save();
    
    RefreshList();
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
    itemEl.querySelector('.stock').replaceChildren(item.stock);
    return itemEl;
  }
  
  function RefreshList() {
    let items = compoInventory.server.GetAll();
    
    listContainer.Refresh(items);
  }
  
  return SELF;
  
})();