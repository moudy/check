var App = require('../app').instance;

App.ChecklistsShowView = Em.View.extend({
  classNames: ['checklist-container']

, classNameBindings: [
    'controller.isPendingDeletion:dim-list'
  , 'controller.isEditing'
  , 'controller.isInProgress'
  ]

, autoFocus: function () {
    var c = this.get('controller');
    if (c.get('isNew') && c.get('isEditing')) this.$('.checklist-title input').focus();
  }.on('didInsertElement')

, actions: {
    childViewDidFocusOut: function () {
      this.get('controller').send('save');
    }
  }

});
