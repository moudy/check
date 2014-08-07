import Ember from 'ember';

export default Ember.ArrayController.extend({

  needs: ['checklist']

, itemController: 'list-items/item'

, canEditBinding: Ember.Binding.oneWay('controllers.checklist.canEdit')

, sortProperties: ['index']

, selectNextItem: function () {
    Ember.run.once(this, function () {
      this.invoke('set', 'isActive', false);
      var next = this.find(function (i) {
        return !i.get('isCompleted');
      });

      if (next) next.set('isActive', true);
    });
  }.observes('@each.isCompleted')

, actions: {

    delete_: function () {
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

  , reorder: function (listItemsIds) {
      var url = `/api/checklists/${this.get('checklist.id')}/reorder`;
      Ember.$.ajax({
        type: 'PUT'
      , url: url
      , data: {listItemsIds: listItemsIds, _method: 'PUT'}
      , dataType: 'json'
      });
    }
  }

});
