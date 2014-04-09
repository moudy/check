require('./application');
require('./signout');
require('./users-show');
require('./checklists_show');
require('./checklists_new');

App.IndexRoute = Em.Route.extend({
  beforeModel: function () {
    var user = this.session.get('user');
    if (user) {
      this.transitionTo('users.show', user);
    }
  }

, afterModel: function () {
    var user = this.session.get('user');
    document.title = [user.get('username'), 'Check'].join(' | ');
  }
});

