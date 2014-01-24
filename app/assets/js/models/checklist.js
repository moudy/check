var App = require('../app').instance;
var attr = DS.attr;

App.ChecklistSerializer = DS.RESTSerializer.extend({
  extractArray: function(store, type, payload, id, requestType) {
    var checklists = payload.checklists;
    var listItems = [];

    checklists.forEach(function(checklist) {
      if(checklist && checklist.listItems) {
        var lis = checklist.listItems;
        listItems = listItems.concat(lis);
        checklist.listItems = lis.map(function (li) { return li.id; });
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
    }

    return this._super(store, type, payload, id, requestType);
  }
});

App.Checklist = DS.Model.extend({
  title: attr('string')
, description: attr('string')
, listItems: DS.hasMany('listItem', {async:true})
});

