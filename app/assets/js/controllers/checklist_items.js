var App = require('../app').instance;

App.ChecklistItemsController = Em.ArrayController.extend({
  itemController: 'checklistItem'

, selectNextItem: function () {
    this.invoke('set', 'isActive', false);
    var next = this.find(function (i) {
      return !i.get('isCompleted');
    });

    next.set('isActive', true);
  }.observes('@each.isCompleted')

});
