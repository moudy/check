var App = require('../app').instance;

App.ChecklistListItemView = Em.View.extend({
  templateName: 'checklist_list_item'

, tagName: 'li'

, classNames: 'checklist-list-item'

, classNameBindings: ['controller.isActive', 'controller.isCompleted']

, click: function () {
    var isEditing = this.get('controller.isEditing');
    if (!isEditing) {
      this.get('controller').send('toggleCompletion');
    }
  }

, autoFocus: function () {
    var c = this.get('controller');
    if (c.get('isNew') && c.get('isEditing')) this.$('input').focus();
  }.on('didInsertElement')

, actions: {
    childViewDidFocusOut: function () {
      this.get('controller').send('save');
    }

  , deleteItem: function () {
      this.$().transition({ opacity: 0 }, 300, function () {
        this.controller.send('deleteItem');
      }.bind(this));
    }
  }

});
