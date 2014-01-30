var App = require('../app').instance;

App.ChecklistsShowController = Em.ObjectController.extend({

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

, isClearable: function () {
    return this.get('isInProgress') && !this.get('isEditing');
  }.property('isInProgress', 'isEditing')

//, orderedItems: function () {
    //return this.get('listItems');
  //}

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
      return +status.completedCount+' of '+status.totalCount + ' complete';
    }
  }.property('listItems.@each.isCompleted')

, actions: {
    clear: function () {
      this.get('listItems').invoke('set', 'isCompleted', false);
    }

  , toggleEdit: function () {
      this.toggleProperty('isEditing');
    }

  , save: function () {
      if (!this.get('model.isDirty')) return;
      this.get('model').save();
    }

  , deleteList: function () {
      this.set('isPendingDeletion', true);
    }

  , cancelDeleteList: function () {
      this.set('isPendingDeletion', false);
    }

  , confirmDeleteList: function () {
      var model = this.get('model');
      model.deleteRecord();
      if (model.get('id')) model.save();
      this.transitionToRoute('index');
    }
  }

});
