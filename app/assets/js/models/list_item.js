var App = require('../app').instance;
var attr = DS.attr;

App.ListItem = DS.Model.extend({
  title: attr('string')
, description: attr('string')
, checklistId: attr('string')
});

