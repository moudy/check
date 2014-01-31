var App = require('../app').instance;

App.SignUpController = Em.Controller.extend({
  actions: {
    signUp: function () {
      var attrs = this.getProperties('username', 'email', 'password');
      var user = this.store.createRecord('user', attrs);

      var sucess = function () { window.location.reload(); };

      var error = function (res) {
        this.set('errors',res.responseJSON.errors);
      };

      user.save().then(sucess.bind(this), error.bind(this));
    }
  }
});
