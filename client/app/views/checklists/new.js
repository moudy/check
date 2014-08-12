import Ember from 'ember';

export default Ember.View.extend({

  classNameBindings: [
  , 'controller.canEdit'
  , 'controller.isLoading'
  ]

});
