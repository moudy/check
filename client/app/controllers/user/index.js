import Ember from 'ember';

export default Ember.ObjectController.extend({

  isCurrentUserProfile: function () {
    return this.session.isCurrentUser(this.get('id'));
  }.property('userId')

, checklistsTitle: function () {
    return this.get('firstName')+"'s Checklists";
  }.property('id')

});
