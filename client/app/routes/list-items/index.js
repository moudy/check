import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.modelFor('checklist').get('listItems');
  }

, setupController: function (controller, model) {
    this._super(controller, model);
    this.set('checklist', this.modelFor('checklist'));
  }

});
