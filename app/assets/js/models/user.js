var attr = DS.attr;

App.User = DS.Model.extend({
  username: attr('string')
, profileImageUrl: attr('string')
, checklists: DS.hasMany('checklist', {async: true})
});
