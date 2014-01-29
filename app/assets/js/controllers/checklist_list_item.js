var App = require('../app').instance;

App.ChecklistListItemController = Em.ObjectController.extend({

  isEditingBinding: Em.Binding.oneWay('parentController.isEditing')

, actions: {
    toggleCompletion: function () {
      this.toggleProperty('isCompleted');
    }

  , save: function () {
      if (!this.get('model.isDirty')) return;
      this.get('model').save();
    }

  , deleteItem: function () {
      var model = this.get('model');
      model.deleteRecord();
      model.save();
    }
  }

});

