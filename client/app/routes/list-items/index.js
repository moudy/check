import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.modelFor('checklist').get('listItems');
  }
});
