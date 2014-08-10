import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  title: attr('string')
, slug: attr('string')
, body: attr('string')
, listItems: DS.hasMany('listItem', {async:true})
, userId: attr('string')
, username: attr('string')
, description: attr('string')
, user: DS.belongsTo('user', {async:true})
});

