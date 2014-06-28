import Ember from 'ember';
import DS from 'ember-data';

var get = Ember.get;

function buildListItemUrl (record) {
  var checklistId = record.get('checklistId');
  var id = get(record, 'id') || '';
  return ['/api/checklists', checklistId, 'list-items', id].join('/');
}

export default DS.RESTAdapter.extend({

  createRecord: function(store, type, record) {
    var data = {};
    var serializer = store.serializerFor(type.typeKey);

    serializer.serializeIntoHash(data, type, record, { includeId: true });

    return this.ajax(buildListItemUrl(record), "POST", { data: data });
  }

, updateRecord: function(store, type, record) {
    var data = {};
    var serializer = store.serializerFor(type.typeKey);

    serializer.serializeIntoHash(data, type, record);

    return this.ajax(buildListItemUrl(record), "PUT", { data: data });
  }

, deleteRecord: function(store, type, record) {
    return this.ajax(buildListItemUrl(record), "DELETE");
  }
});
