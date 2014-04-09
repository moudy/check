App.UsersShowRoute = Em.Route.extend({

  model: function (params) {
    return this.store.find('user', params.username);
  }

, afterModel: function (model) {
    document.title = [model.get('username'), 'Check'].join(' | ');
  }

, serialize: function (user) {
    return user.getProperties('username');
  }

});
