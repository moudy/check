import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  extractArray: function(store, type, payload, id, requestType) {
    var checklists = payload.checklists;
    var listItems = [];

    checklists.forEach(function(checklist) {
      if(checklist && checklist.listItems) {
        var lis = checklist.listItems;
        listItems = listItems.concat(lis);
        checklist.listItems = lis.map(function (li) { return li.id; });
        //checklist.user = checklist.userId;
      }
    });

    payload = {
      listItems: listItems
    , checklists: checklists
    };

    return this._super(store, type, payload, id, requestType);
  }

, extractSingle: function(store, type, payload, id, requestType) {
    var listItems, listItemIds;
    if (payload.checklist) {
      listItems = payload.checklist.listItems;
      listItemIds = listItems.mapProperty('id');

      payload.listItems = listItems;
      payload.checklist.listItems = listItemIds;
      payload.checklist.user = payload.checklist.userId;
    }

    return this._super(store, type, payload, id, requestType);
  }
});