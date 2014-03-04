var App = require('../app').instance;
var attr = DS.attr;

App.ListItem = DS.Model.extend({
  description: attr('string')
, checklistId: attr('string')
, checklist: DS.belongsTo('checklist', {async:true})
, index: attr('number')
, isCompleted: function (key, value) {
    var lsKey = 'ListItem:'+this.get('id')+':isCompleted';
    if (window.localStorage) {
      if (arguments.length > 1) window.localStorage.setItem(lsKey, value);
      return window.localStorage.getItem(lsKey) === 'true';
    } else {
      if (arguments.length > 1) this.set(key, value);
      return this.get(key) === 'true';
    }
  }.property()
});

