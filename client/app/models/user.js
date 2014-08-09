import Ember from 'ember';
import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({

  username: attr('string')

, name: attr('string')

, profileImageUrl: attr('string')

, checklists: DS.hasMany('checklist', {async: true})

, firstName: function () {
    return this.get('name').split(' ')[0];
  }.property('name')

, checklistsCount: function () {
    return DS.PromiseObject.create({
      promise: Ember.$.getJSON('/api/users/'+this.get('id')+'/checklists/count')
    });
  }.property('id')

, saveRecentlyViewed: function (checklistId) {
    return Ember.$.ajax({
      url: `/api/users/${this.get('id')}/checklists/add-recently-viewed`
    , type: 'POST'
    , data: {checklistId: checklistId}
    , dataType: 'json'
    });
  }

});
