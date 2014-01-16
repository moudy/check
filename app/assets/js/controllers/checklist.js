var App = require('../app').instance;

App.ChecklistController = Em.ObjectController.extend({
  totalCount: function () {
    return this.get('listItems.length');
  }.property('listItems.@each.isCompleted')

, uncompletedCount: function () {
    return this.get('listItems').filter(function (i) {
      return !i.get('isCompleted');
    }).get('length');
  }.property('listItems.@each.isCompleted')

, completedCount: function () {
    return this.get('listItems').filter(function (i) {
      return !!i.get('isCompleted');
    }).get('length');
  }.property('listItems.@each.isCompleted')

, isCompleted: function () {
    return this.get('uncompletedCount') === 0;
  }.property('listItems.@each.isCompleted')

, isInProgress: function () {
    return this.get('completedCount') > 0;
  }.property('listItems.@each.isCompleted')

, statusMessage: function () {
    var status = this.getProperties(
      'completedCount'
    , 'uncompletedCount'
    , 'isCompleted'
    , 'isInProgress'
    , 'totalCount');

    if (status.isCompleted) {
      return 'All '+status.completedCount+' items complete';
    } else if (!status.isInProgress) {
      return status.uncompletedCount+' items';
    } else {
      return +status.completedCount+' of '+status.totalCount + ' complete ('+status.uncompletedCount+' to go)';
    }
  }.property('listItems.@each.isCompleted')

, selectNextItem: function () {
    this.get('listItems').invoke('set', 'isActive', false);
    var next = this.get('listItems').find(function (i) {
      return !i.get('isCompleted');
    });

    next && next.set('isActive', true);

  }.observes('listItems.@each.isCompleted')

, actions: {
    clear: function () {
      this.get('listItems').invoke('set', 'isCompleted', false);
    }
  }

});
