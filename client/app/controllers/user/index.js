import Ember from 'ember';

export default Ember.ObjectController.extend({

  isCurrentUserProfile: function () {
    return this.session.isCurrentUser(this.get('id'));
  }.property('userId')

, checklistsTotal: function () {
    return this.get('checklistCount.total');
  }.property('checklistCount.total')

, checklistsTitle: function () {
    return this.get('username')+"'s Checklists";
  }.property('id')

});
