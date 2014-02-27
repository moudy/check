App.ChecklistListItemView = Em.View.extend({
  templateName: 'checklist_list_item'

, tagName: 'li'

, classNames: 'checklist-list-item'

, classNameBindings: [
    'controller.isActive'
  , 'controller.isEditing'
  , 'controller.isCompleted'
  , 'controller.animateMoveFlash'
  ]

, checkState: function () {
    if (this.get('controller.isNew')) this.get('controller').send('edit');
  }.on('didInsertElement')

, autoFocus: function () {
    if (!this.get('controller.isEditing')) return;
    Em.run.scheduleOnce('afterRender', this, function () {
      this.$('textarea').focus();
    });
  }.observes('controller.isEditing')

, actions: {
    delete: function () {
      if (!window.confirm('Are you sure?')) return;
      this.$().transition({ opacity: 0 }, 300, function () {
        this.get('controller').send('delete_');
      }.bind(this));
    }
  }

});
