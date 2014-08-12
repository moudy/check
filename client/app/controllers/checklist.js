import DS from 'ember-data';
import Ember from 'ember';

var DEFAULT_BODY = '[x] Your first step...';

function isNotBlank (str) {
  return str && str.trim();
}

export default Ember.ObjectController.extend({

  canEdit: function () {
    return this.session.isCurrentUser(this.get('userId'));
  }.property('userId')

, listItems: function () {
    var body = this.get('body');
    var items = body.split(/\[x\]/m).filter(isNotBlank);

    return items.map(function (item) {
      return Ember.Object.create({text: item, isCompleted: false});
    });
  }.property('body')

, body: function (key, value) {
    if (arguments.length > 1) {
      this.set('model.body', value);
    }
    return this.get('model.body') || DEFAULT_BODY;
  }.property('model.body')

, zebraStripes: function () {
    var base = 0;
    return this.get('listItems').map((li) => {
      var value = base;
      base = base + ((li.get('text').split('\n').length - 1) * 20);
      return {
        style: `top: ${value}px;`
      };
    });
  }.property('listItems.@each')

, user: function () {
    return DS.PromiseObject.create({
      promise: this.store.find('user', this.get('userId'))
    });
  }.property('userId')

, showListItems: Ember.computed.not('isEditing')

, showDescription: Ember.computed.or('description', 'canEdit')

, totalCount: Ember.computed.alias('listItems.length')

, uncompletedItems: Ember.computed.filterBy('listItems', 'isCompleted', false)

, completedItems: Ember.computed.filterBy('listItems', 'isCompleted', true)

, uncompletedCount: Ember.computed.alias('uncompletedItems.length')

, completedCount: Ember.computed.alias('completedItems.length')

, isCompleted: Ember.computed.equal('uncompletedCount', 0)

, isInProgress: Ember.computed.gt('completedCount', 0)

, isNotEditing: Ember.computed.not('isEditing')

, isClearable: Ember.computed.and('isInProgress', 'isNotEditing')

, statusMessage: function () {
    var status = this.getProperties(
      'completedCount'
    , 'uncompletedCount'
    , 'isCompleted'
    , 'isInProgress'
    , 'totalCount');

    if (status.isCompleted) {
      return 'All '+status.completedCount+' steps completed!';
    } else if (!status.isInProgress) {
      return status.totalCount + ' ' + (status.totalCount === 1 ? 'step' : 'steps');
    } else {
      return +status.completedCount+' of '+status.totalCount + ' complete';
    }
  }.property('listItems.@each.isCompleted')

, updateUrl: function () {
    Ember.run.once(this, function () {
      var pathname = '/'+[this.get('username'), this.get('slug')].join('/');
      var windowPathname = window.location.pathname;
      var title = this.get('title');
      if (windowPathname !== pathname) {
        window.history.replaceState( {} , title, pathname);
      }
    });
  }.observes('slug')

, actions: {
    clear: function () {
      this.get('listItems').invoke('set', 'isCompleted', false);
    }

  , save: function () {
      if (this.get('model.isDirty')) this.get('model').save();
    }

  , toggleEdit: function () {
      this.toggleProperty('isEditing');
    }

  , editTitle: function () {
      this.set('isEditingTitle', true);
    }

  , titleDidFocusOut: function () {
      this.set('isEditingTitle', false);
      this.send('save');
    }

  , descriptionDidFocusOut: function () {
      this.set('isEditingDescription', false);
      this.send('save');
    }

  }

});
