let compoInventory = (function() {
  
  let SELF = {
    Add,
    ReduceStock,
    // GetAll,
    Commit,
    RestoreData,
    // Remove,
    server: {
      RemoveItem: (id) => server.RemoveItem(id),
      // AddItem: (item) => server.AddItem(item),
      GetAll: () => server.GetAll(),
      GetById: (id) => server.GetItem(id),
      // GetIndex: (id) => server.GetIndex(id),
      // Clear: () => server.Clear()
    }
  };
  
  let componentStorageKey = 'compoInventory';
  let data = {
    items: [],
  };
  let itemModel = {
    id: '',
    name: '',
    stock: 0,
  };
  let server = new DataServer({
    dataItems: data.items,
    adaptor: {
      lookupKey: 'id',
      GetItem: (item, value) => item.id == value,
    }
  });
  
  function RestoreData(restoredData) {
    if (restoredData) {
      data = restoredData;
      server.SetDataItems(data.items);
    }
  }
  
  function Add(inputItem) {
    let existing = server.GetItem(inputItem.id);
    
    if (existing) {
      let {id, name, stock} = existing;
      let item = Object.assign({}, itemModel, {
        id,
        name,
        stock: stock + 1,
      });
      server.UpdateItem(id, item);
    } else {
      let {id, name} = inputItem;
      let item = Object.assign({}, itemModel, {
        id,
        name,
        stock: 1,
      });
      server.AddItem(item);
    }
    
  }
  
  function ReduceStock(itemId) {
    let existing = server.GetItem(itemId);
    if (!existing) return;
    
    let {id, name, stock} = existing;
    let item = Object.assign({}, itemModel, {
      id,
      name,
      stock: stock - 1,
    });
    server.UpdateItem(id, item);
  }

  
  function refreshGold() {
    let gold = compoStats.GetGold();
    $('._txtGold').replaceChildren(`${gold}`);
  }
  
  function Init() {
    DOMEvents.Init();
  }
  
  function Commit() {
    appData.SetComponentData(componentStorageKey, data);
  }
  
  return SELF;
  
})();