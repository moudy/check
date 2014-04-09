App.ChecklistsShowView = Em.View.extend({
  classNames: ['checklist-container']

, classNameBindings: [
    'controller.isEditing'
  , 'controller.isInProgress'
  , 'controller.canEdit'
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
