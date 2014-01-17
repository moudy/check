var App = require('../app').instance;

App.ChecklistItemController = Em.ObjectController.extend({
  actions: {
    toggleCompletion: function () {
      this.toggleProperty('isCompleted');
    }

  , save: function () {
      if (!this.get('model.isDirty')) return;
      this.get('model').save();
    }
  }
});
