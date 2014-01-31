var App = require('../app').instance;
var attr = DS.attr;

App.ListItem = DS.Model.extend({
  description: attr('string')
, checklistId: attr('string')
, checklist: DS.belongsTo('checklist', {async:true})
, index: attr('number')
});

