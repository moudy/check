var App = require('../app').instance;

App.ApplicationRoute = Em.Route.extend({

  model: function () {
    var currentUser = global.DATA.currentUser;
    if (currentUser) {
      delete global.DATA.currentUser;
      this.controllerFor('application').setCurrentUser(currentUser);
    }
  }

});
