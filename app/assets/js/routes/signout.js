var App = require('../app').instance;

App.SignoutRoute = Em.Route.extend({
  beforeModel: function () {
    this.transitionTo('index');
  }
});
