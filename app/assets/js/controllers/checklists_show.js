App.ChecklistsShowController = Em.ObjectController.extend({

  canEdit: function () {
    return this.session.isCurrentUser(this.get('user'));
  }.property('userId')

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

  , delete_: function () {
      if (!window.confirm('Are you sure?')) return;
      var self = this;
      var model = this.get('model');

      model.destroyRecord().then(function() {
        var checklists = self.session.get('user.checklists');
        checklists.removeObject(model);
        Em.run.next(null, function() {
          self.transitionToRoute('users.show', self.session.get('user'));
        });
      });
    }
  }

});
