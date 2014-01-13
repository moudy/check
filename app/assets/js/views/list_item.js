var App = require('../app').instance;

App.ListItemView = Em.View.extend({
  templateName: 'checklist_item'

, tagName: 'li'

, classNames: 'checklist-item'

, classNameBindings: ['isEditing', 'controller.isActive', 'controller.isCompleted']

, actions: {
    edit: function () {
      this.toggleProperty('isEditing');
      if (!this.get('isEditing')) {
        this.get('controller').send('save');
      }
    }
  }

});
