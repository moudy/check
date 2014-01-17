var App = require('../app').instance;

App.ChecklistItemView = Em.View.extend({
  templateName: 'checklist_item'

, tagName: 'li'

, classNames: 'checklist-item'

, classNameBindings: ['controller.isEditing', 'controller.isActive', 'controller.isCompleted']

, click: function () {
    if (this.get('controller.isEditing')) return;
    this.get('controller').send('toggleCompletion');
  }

, actions: {
    childViewDidFocusOut: function () {
      this.get('controller').send('save');
    }
  }

});
