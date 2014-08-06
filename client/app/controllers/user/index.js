import Ember from 'ember';

export default Ember.ObjectController.extend({

  isCurrentUserProfile: function () {
    return this.session.isCurrentUser(this.get('id'));
  }.property('userId')

, sort: 'foo'

, sortOptions: [
    Ember.Object.create({ title: 'Recent', value: null})
  , Ember.Object.create({ title: 'A-Z', value: 'title'})
  ]

, checklistsTotal: function () {
    return this.get('checklistCount.total');
  }.property('checklistCount.total')

});
