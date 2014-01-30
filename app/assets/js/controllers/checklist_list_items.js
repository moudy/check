var App = require('../app').instance;

App.ChecklistListItemsController = Em.ArrayController.extend({
  itemController: 'checklistListItem'

, isEditingBinding: Em.Binding.oneWay('parentController.isEditing')

//, sortProperties: ['description']

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

  , move: function (dir, model) {
      var items = this.get('checklist.listItemsOrder').split(',');
      var index = items.indexOf(model.get('id'));
      var newIndex = index + (('up' === dir) ? -1 : 1);
      this.removeAt(index);
      this.insertAt(newIndex, model);

      items.splice(index, 1);
      items.splice(newIndex, 0, model.get('id'));

      this.set('checklist.listItemsOrder', items.join(','));
      this.get('checklist').save();

      Em.run.later(this, function() {
        model.set('animateMoveFlash', true);
        Em.run.later(this, function () { model.set('animateMoveFlash', false); }, 600);
      }, 10);
    }
  }

});
