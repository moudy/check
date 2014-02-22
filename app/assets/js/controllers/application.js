var App = require('../app').instance;

App.ApplicationController = Em.Controller.extend({
  needs: ['index']

, setCurrentUser: function (user) {
    this.store.push('user', user);
    this.session.set('user', user);
  }

, actions: {
    signout: function () {
      this.session.set('user', null);
      Em.$.post('/sessions', { _method: 'DELETE' });
      App.Router.router.getHandler('index').renderTemplate();
    }
  }

});

