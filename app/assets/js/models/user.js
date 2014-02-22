var App = require('../app').instance;
var attr = DS.attr;

App.User = DS.Model.extend({
  username: attr('string')
, email: attr('string')
, password: attr('string')
, profileImageUrl: attr('string')
, checklists: DS.hasMany('checklist', {async: true})
, foo: function () { return 'bar'; }
});
