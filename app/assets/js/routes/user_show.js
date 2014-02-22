var App = require('../app').instance;

App.UsersShowRoute = Em.Route.extend({

  model: function (params) {
    return this.store.find('user', params.username);
  }

, setupController: function (controller, user) {
    controller.set('user', user);
    user.get('checklists').then(function (checklists) {
      controller.set('checklists', checklists);
    });
  }

});
