var App = require('../app').instance;

App.ChecklistListItemController = Em.ObjectController.extend({

  isEditingBinding: Em.Binding.oneWay('parentController.isEditing')

, showEditControls: function () {
    return this.get('isEditing') && !this.get('isEditingMd');
  }.property('isEditing', 'isEditingMd')

, actions: {
    toggleCompletion: function () {
      this.toggleProperty('isCompleted');
    }

  , save: function () {
      if (!this.get('model.isDirty')) return;
      this.get('model').save();
    }

  , deleteItem: function () {
      this.get('target').send('deleteItem', this.get('model'));
    }

  , move: function (dir) {
      this.get('target').send('move', dir, this.get('model'));
    }
  }

});

