App.ChecklistsShowController = Em.ObjectController.extend({

  canEdit: function () {
    return this.session.isCurrentUser(this.get('user'));
  }.property('userId')

, showDescription: function () {
    return this.get('description') || this.get('canEdit');
  }.property('description', 'canEdit')

, totalCount: function () {
    return this.get('listItems.length');
  }.property('listItems.@each.isCompleted')

, countSummary: function () {
    var len = this.get('listItems.length');
    var word = len === 1 ? 'step' : 'steps';
    if (len) return len+' '+word;
  }.property('listItems.length')

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

, isCompleted: Em.computed.equal('uncompletedCount', 0).property('listItems.@each.isCompleted')

, isInProgress: Em.computed.gt('completedCount', 0).property('listItems.@each.isCompleted')

, isClearable: function () {
    return this.get('isInProgress') && !this.get('isEditing');
  }.property('isInProgress', 'isEditing')

, isEditable: function () {
    return this.session.isCurrentUser(this.get('userId'));
  }.property()

, statusMessage: function () {
    var status = this.getProperties(
      'completedCount'
    , 'uncompletedCount'
    , 'isCompleted'
    , 'isInProgress'
    , 'totalCount');

    if (status.isCompleted) {
      return 'All '+status.completedCount+' items completed!';
    } else if (!status.isInProgress) {
      return status.uncompletedCount+' items';
    } else {
      return +status.completedCount+' of '+status.totalCount + ' complete';
    }
  }.property('listItems.@each.isCompleted')

, updateUrl: function () {
    var pathname = '/'+[this.get('username'), this.get('slug')].join('/');
    var windowPathname = window.location.pathname;
    var title = this.get('title');
    if (windowPathname !== pathname) {
      Em.run.once(function(){
        window.history.replaceState( {} , title, pathname);
      });
    }
  }.observes('slug')

, actions: {
    clear: function () {
      this.get('listItems').invoke('set', 'isCompleted', false);
    }

  , save: function () {
      this.get('model').save();
    }

  , toggleEdit: function () {
      this.toggleProperty('isEditing');
    }

  , childViewDidFocusOut: function () {
      if (this.get('model.isDirty')) this.send('save');
    }

  , addItem: function () {
      var checklistId = this.get('id');
      var attrs = {checklistId: checklistId, index: this.get('listItems.length')};
      var listItem = this.store.createRecord('listItem', attrs);
      this.get('model.listItems').pushObject(listItem);
    }

  }

});
