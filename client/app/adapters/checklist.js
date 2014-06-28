import Ember from 'ember';
import DS from 'ember-data';

var get = Ember.get;

function buildChecklistCreateUrl (record) {
  var userId = get(record, 'userId');
  return ['/api/users', userId, 'checklists'].join('/');
}

export default DS.RESTAdapter.extend({
  createRecord: function(store, type, record) {
    var data = {};
    var serializer = store.serializerFor(type.typeKey);

    serializer.serializeIntoHash(data, type, record, { includeId: true });

    return this.ajax(buildChecklistCreateUrl(record), "POST", { data: data });
  }
});
