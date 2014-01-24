var App = require('../app').instance;

App.ChecklistItemsController = Em.ArrayController.extend({
  itemController: 'checklistItem'

, isEditingBinding: Em.Binding.oneWay('parentController.isEditing')

, selectNextItem: function () {
    this.invoke('set', 'isActive', false);
    var next = this.find(function (i) {
      return !i.get('isCompleted');
    });

    next && next.set('isActive', true);
  }.observes('@each.isCompleted')

, actions: {
    addItem: function () {
      var checklistId = this.get('parentController.model.id');
      var listItem = this.store.createRecord('listItem', {checklistId: checklistId});
      this.pushObject(listItem);
      listItem.save();
    }
  }

});
