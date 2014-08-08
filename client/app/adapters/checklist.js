import Ember from 'ember';
import ApplicationAdapter from './application';

var get = Ember.get;

function buildChecklistCreateUrl (record) {
  var userId = get(record, 'userId');
  return ['/api/users', userId, 'checklists'].join('/');
}

export default ApplicationAdapter.extend({

  userChecklistsUrl: function (userId) {
    var url = ['users', userId];
    var host = get(this, 'host');
    var prefix = this.urlPrefix();
    url.push('checklists');

    if (prefix) { url.unshift(prefix); }

    url = url.join('/');
    if (!host && url) { url = '/' + url; }

    return url;
  }

, userRecentChecklistsUrl: function (userId) {
    var url = ['users', userId, 'checklists', 'recently-viewed'];
    var host = get(this, 'host');
    var prefix = this.urlPrefix();

    if (prefix) { url.unshift(prefix); }

    url = url.join('/');
    if (!host && url) { url = '/' + url; }

    return url;
  }

, createRecord: function(store, type, record) {
    var data = {};
    var serializer = store.serializerFor(type.typeKey);

    serializer.serializeIntoHash(data, type, record, { includeId: true });

    return this.ajax(buildChecklistCreateUrl(record), "POST", { data: data });
  }

, findQuery: function (store, type, query) {
    var userId;
    if (query.recent && query.userId) {
      userId = query.userId;
      delete query.userId;
      delete query.recent;
      return this.ajax(this.userRecentChecklistsUrl(userId), 'GET', { data: query });
    } else if (query.userId) {
      userId = query.userId;
      delete query.userId;
      return this.ajax(this.userChecklistsUrl(userId), 'GET', { data: query });
    } else {
      return this._super.apply(this, arguments);
    }
  }
});
