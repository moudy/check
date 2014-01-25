var App = require('../app').instance;

App.ApplicationController = Em.ArrayController.extend({
  isLoggedIn: false

, showSignup: function () {
    return !this.get('isLoggedIn') && ('index' !== this.currentPath);
  }.property('isLoggedIn', 'currentPath')

});

