var App = require('../app').instance;

App.HeaderController = Em.Controller.extend({

  currentUserBinding: 'session.user'

});
