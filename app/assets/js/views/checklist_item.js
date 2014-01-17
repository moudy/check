var App = require('../app').instance;

App.ChecklistItemView = Em.View.extend({
  templateName: 'checklist_item'

, tagName: 'li'

, classNames: 'checklist-item'

, classNameBindings: ['controller.isEditing', 'controller.isActive', 'controller.isCompleted']

, click: function () {
    this.get('controller').send('toggleCompletion');
  }

});
