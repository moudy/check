var App = require('../app').instance;

App.HeaderView = Em.View.extend({
  templateName: 'header'

, autoFocus: function () {
    if (this.get('controller.showSignin')) {
      Em.run.next(this, function () { this.$('form input').first().focus(); });
    }
  }.observes('controller.showSignin')

, actions: {
    toggleMenu: function () {
      this.toggleProperty('showMenu');
    }
  }
});

