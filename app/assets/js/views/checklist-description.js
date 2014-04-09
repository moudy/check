App.ChecklistDescriptionView = Em.View.extend({
  classNames: ['p', 'checklist-description', 'editable-field']

, click: function (e) {
    var isLink = !!e.target.href;
    if (this.get('controller.canEdit') && !isLink) {
      this.get('parentView').toggleEditState('description', true);
    }
  }

, actions: {
    childViewDidFocusOut: function (childView) {
      this.get('parentView').send('childViewDidFocusOut', childView);
    }
  }

});

