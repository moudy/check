require('./application');
require('./signout');
require('./checklists_show');
require('./checklists_new');
var App = require('../app').instance;

App.IndexRoute = Em.Route.extend({
  isAuthenticated: function () {
    return !!this.controllerFor('application').get('currentUser');
  }

, model: function () {
    if (this.isAuthenticated()) {
      return this.store.find('checklist');
    }
  }

, renderTemplate: function () {
    if (this.isAuthenticated()) {
      this.render();
    } else {
      this.render('foyer', {controller:'foyer'});
    }
  }

});

