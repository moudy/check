import Ember from 'ember';
import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  username: attr('string')
, profileImageUrl: attr('string')
, checklists: DS.hasMany('checklist', {async: true})

, checklistCount: function () {
    return DS.PromiseObject.create({
      promise: Ember.$.getJSON('/api/users/'+this.get('id')+'/checklists/count')
    });
  }.property('id')

});
