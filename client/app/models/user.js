import DS from 'ember-data';
var attr = DS.attr;

export default DS.Model.extend({
  username: attr('string')
, profileImageUrl: attr('string')
, checklists: DS.hasMany('checklist', {async: true})
});