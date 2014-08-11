import Ember from 'ember';

export default Ember.View.extend({

  templateName: 'list-items/item'

, classNames: 'checklist-list-item'

, classNameBindings: [
    'controller.isCompleted'
  ]

});
