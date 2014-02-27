App.ChecklistListItemController = Em.ObjectController.extend({

  reorderModeBinding: Em.Binding.oneWay('target.reorderMode')

, showEditIcon: function () {
    return !this.get('isEditing') && this.get('parentController.canEdit');
  }.property('isEditing')

, actions: {
    save: function () {
      if (!this.get('model.isDirty')) return;
      this.get('model').save();
    }

  , edit: function () {
      this.set('isEditing', true);
    }

  , doneEditing: function () {
      this.set('isEditing', false);
      this.send('save');
    }

  , delete_: function () {
      this.get('target').send('deleteItem', this.get('model'));
    }

  , move: function (dir) {
      this.get('target').send('move', dir, this.get('model'));
    }
  }

});

