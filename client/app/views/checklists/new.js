import Ember from 'ember';

export default Ember.View.extend({
  classNames: 'content-width checklists-show'

, classNameBindings: [
  , 'controller.canEdit'
  , 'controller.isLoading'
  ]

});
