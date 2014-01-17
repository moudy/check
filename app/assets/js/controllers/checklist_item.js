var App = require('../app').instance;

App.ChecklistItemController = Em.ObjectController.extend({
  actions: {
    toggleCompletion: function () {
      this.toggleProperty('isCompleted');
    }
  }
});
