import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  title: attr('string')
, slug: attr('string')
, body: attr('string')
, userId: attr('string')
, username: attr('string')
, description: attr('string')
, stepCount: attr('number')
, user: DS.belongsTo('user', {async:true})
});

