App.ChecklistListItemsController = Em.ArrayController.extend({
  itemController: 'checklistListItem'

, canEditBinding: Em.Binding.oneWay('parentController.canEdit')

, showReorderButton: Em.computed.gt('length', 1)

, reorderCopy: function () {
    return this.get('reorderMode') ? 'Done Reordering Items' : 'Reorder Items';
  }.property('reorderMode', '@each')

, sortProperties: ['index']

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
      var checklistId = this.get('checklist.id');
      var attrs = {checklistId: checklistId, index: this.get('length')};
      var listItem = this.store.createRecord('listItem', attrs);
      this.pushObject(listItem);
    }

  , toggleReorderMode: function () {
      this.toggleProperty('reorderMode');
    }

  , delete_: function () {
      this.get('parentController').send('delete_');
    }

  , deleteItem: function (model) {
      this.get('content').removeObject(model);
      model.destroyRecord();
      var models = this.get('arrangedContent');
      for (var i=0, len=models.length; i < len; i++) {
        models[i].set('index', i);
      }
    }

  , move: function (dir, model) {
      var index = model.get('index');
      var newIndex = index + (('up' === dir) ? -1 : 1);

      var swapWith = this.findBy('index', newIndex);

      model.set('index', newIndex);
      swapWith && swapWith.set('index', index);

      var listItemIds = this.getEach('id');

      Em.$.post('/checklists/'+this.get('checklist.id')+'/reorder', {listItemIds: listItemIds, _method: 'PUT'});

      Em.run.later(this, function() {
        model.set('animateMoveFlash', true);
        Em.run.later(this, function () { model.set('animateMoveFlash', false); }, 600);
      }, 10);
    }
  }

});
