import Ember from 'ember';

export default Ember.View.extend({

  templateName: 'checklist/header'

, tagName: 'header'

, classNames: ['checklist-header']

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
