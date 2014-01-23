require('./checklist');
var App = require('../app').instance;

App.IndexRoute = Em.Route.extend({
  model: function () {
    return this.store.find('checklist');
  }
});

