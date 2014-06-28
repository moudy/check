import Ember from 'ember';

export default Ember.Object.extend({
  isCurrentUser: function (userId) {
    if (userId && 'string' !== typeof userId) userId = userId.get('id');
    return userId && this.get('user.id') === userId;
  }

, login: function (user) {
    this.set('user', user);
  }
});


