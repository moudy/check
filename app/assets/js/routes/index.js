require('./checklists_show');
require('./checklists_new');
var App = require('../app').instance;

App.IndexRoute = Em.Route.extend({
  model: function () {
    return this.store.find('checklist');
  }

, renderTemplate: function () {
    this.render('foyer', {controller:'foyer'});
  }

});

