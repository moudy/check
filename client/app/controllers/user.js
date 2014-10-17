import Ember from 'ember';

export default Ember.ObjectController.extend({

  isCurrentUserProfile: function () {
    return this.session.isCurrentUser(this.get('id'));
  }.property('userId')

});
