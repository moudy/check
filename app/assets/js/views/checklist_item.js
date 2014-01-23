var App = require('../app').instance;

App.ChecklistItemView = Em.View.extend({
  templateName: 'checklist_item'

, tagName: 'li'

, classNames: 'checklist-list-item'

, classNameBindings: ['controller.isActive', 'controller.isCompleted']

, click: function () {
    var isEditing = this.get('controller.isEditing');
    if (!isEditing) {
      this.get('controller').send('toggleCompletion');
    }
  }

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
