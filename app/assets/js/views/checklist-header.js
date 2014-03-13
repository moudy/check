App.ChecklistHeaderView = Em.View.extend({

  templateName: 'checklists/checklist-header'

, actions: {
    edit: function (property) {
      if (this.get('controller.canEdit')) this.toggleEditState(property, true);
    }

  , childViewDidFocusOut: function (childView) {
      this.toggleEditState(childView.property, false);
      this.get('controller').send('childViewDidFocusOut', childView);
    }
  }

, toggleEditState: function (property, isEditing) {
    this.set('controller.isEditing'+property.capitalize(), isEditing);
  }

});
