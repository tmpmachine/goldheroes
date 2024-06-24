let compoReward = (function() {
  
  let SELF = {
    Add,
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
  
  let data = {
    items: [],
  };
  let itemModel = {
    id: '',
    name: '',
    price: 0,
    buyCount: 0,
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
  
  function Add(name, price) {
    let item = Object.assign({}, itemModel, {
      id: Date.now().toString(),
      name,
      price,
    });
    server.AddItem(item)
  }

  
  function refreshGold() {
    let gold = compoStats.GetGold();
    $('._txtGold').replaceChildren(`${gold}`);
  }
  
  function Init() {
    DOMEvents.Init();
  }
  
  function Commit() {
    let componentStorageKey = 'compoReward';
    appData.SetComponentData(componentStorageKey, data);
  }
  
  return SELF;
  
})();