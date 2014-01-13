var App = require('../app').instance;

App.RootController = Em.ArrayController.extend({

  actions: {
    addItem: function () {
      var checklist = this.get('checklist');
      var item = this.store.createRecord('listItem', {checklistId: checklist.get('id')});
      checklist.get('listItems').pushObject(item);
      item.save();
    }

  , save: function() {
      var model = this.get('checklist');
      model.save();
    }
  }

});
