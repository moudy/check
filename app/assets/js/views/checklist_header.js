var App = require('../app').instance;

App.ChecklistHeaderView = Em.View.extend({
  templateName: 'checklist_header'

, actions: {
    edit: function (property) {
      this.toggleEditState(property, true);
    }

  , childViewDidFocusOut: function (childView) {
      this.toggleEditState(childView.property, false);
    }
  }

, toggleEditState: function (property, isEditing) {
    this.set('isEditing-'+property, isEditing);
  }

});
