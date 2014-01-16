var App = require('../app').instance;

App.ChecklistItemController = Em.ObjectController.extend({

  actions: {
    toggleCompletion: function () {
      this.toggleProperty('isCompleted');
    }

  //, delete: function (item) {
      //item.deleteRecord();
      //item.save();
    //}

  //, save: function() {
       //var model = this.get('model');
       //model.save();
    //}
  }
});
