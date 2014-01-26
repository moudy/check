var App = require('../app').instance;

App.SignUpView = Em.View.extend({

  autoFocus: function () {
    Em.run.next(this, function () {
      if (this.get('controller.errors')) this.$('.has-error input').first().focus();
    });
  }.observes('controller.errors')

, removeErrorClass: function (e) {
    Em.$(e.target).closest('.signup-form-group').removeClass('has-error');
  }.on('focusOut')

});
