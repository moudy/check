var App = require('../app').instance;

App.ChecklistListItemsController = Em.ArrayController.extend({
  itemController: 'checklistListItem'

, isEditingBinding: Em.Binding.oneWay('parentController.isEditing')

, selectNextItem: function () {
    Em.run.once(this, function () {
      this.invoke('set', 'isActive', false);
      var next = this.find(function (i) {
        return !i.get('isCompleted');
      });

      next && next.set('isActive', true);
    });
  }.observes('@each.isCompleted')

, actions: {
    addItem: function () {
      var checklistId = this.get('parentController.model.id');
      var listItem = this.store.createRecord('listItem', {checklistId: checklistId});
      this.pushObject(listItem);
    }
  }

});
