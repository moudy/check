var App = require('../app').instance;

App.UsersShowRoute = Em.Route.extend({

  model: function (params) {
    return this.store.find('user', params.username);
  }

, serialize: function (user) {
    return user.getProperties('username');
  }

});
