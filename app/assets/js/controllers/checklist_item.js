var App = require('../app').instance;

App.ChecklistItemController = Em.ObjectController.extend({
  actions: {
    toggleCompletion: function () {
      var m = this.get('model');
      m.set('isCompleted', !m.get('isCompleted'));
    }
  }
});
