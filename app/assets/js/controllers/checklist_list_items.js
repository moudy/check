var App = require('../app').instance;

App.ChecklistListItemsController = Em.ArrayController.extend({
  itemController: 'checklistListItem'

, isEditingBinding: Em.Binding.oneWay('parentController.isEditing')

, checklistBinding: Em.Binding.oneWay('parentController.model')

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

  , move: function (dir, modelId) {
      var items = this.get('checklist.listItemsOrder').split(',');
      var index = items.indexOf(modelId);
      var newIndex = index + (('up' === dir) ? -1 : 1);

      items.splice(index, 1);
      items.splice(newIndex, 0, modelId);

      var listItemsOrder = items.slice(0).join(',');

      this.get('content').forEach(function (model) {
        var i = items.indexOf(model.get('id'));
        items[i] = model;
      });

      this.setObjects(items);

      this.set('checklist.listItemsOrder', listItemsOrder);
      this.get('checklist').save();
    }
  }

});
