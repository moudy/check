import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    return this.modelFor('user');
  }

, afterModel: function (model) {
    document.title = [model.get('username'), 'Check'].join(' | ');
  }

, serialize: function (user) {
    return user.getProperties('username');
  }

});
