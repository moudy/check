import Ember from 'ember';

export default Ember.Route.extend({

  init: function () {
    var currentUser = Ember.ENV.currentUser;
    if (currentUser) {
      currentUser = this.store.push('user', currentUser);
      this.session.login(currentUser);
    }
  }

});
