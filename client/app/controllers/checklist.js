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
      return {text: item};
    });
  }.property('body')

, body: function () {
    return this.get('model.body') || DEFAULT_BODY;
  }.property('model.body')

, zebraStripes: function () {
    var base = 0;
    return this.get('listItems').map((li) => {
      var value = base;
      base = base + ((li.text.split('\n').length - 1) * 20);
      return {
        style: `top: ${value}px;`
      };
    });
  }.property('listItems')

, showListItems: Ember.computed.not('isEditing')

, user: function () {
    return DS.PromiseObject.create({
      promise: this.store.find('user', this.get('userId'))
    });
  }.property('userId')

, showDescription: Ember.computed.or('description', 'canEdit')

, totalCount: Ember.computed.alias('listItems.length')

, uncompletedCount: function () {
    return this.get('listItems.length');
    //return this.get('listItems').filter(function (i) {
      //return !i.get('isCompleted');
    //}).get('length');
  }.property('listItems.length')

, completedCount: function () {
    return 0;
    //return this.get('listItems').filter(function (i) {
      //return !!i.get('isCompleted');
    //}).get('length');
  }.property('listItems.length')

, isCompleted: Ember.computed.equal('uncompletedCount', 0)

, isInProgress: Ember.computed.gt('completedCount', 0)

, isClearable: function () {
    return this.get('isInProgress') && !this.get('isEditing');
  }.property('isInProgress', 'isEditing')

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
      return status.uncompletedCount+' steps';
    } else {
      return +status.completedCount+' of '+status.totalCount + ' complete';
    }
  }.property('listItems.@each')

, updateUrl: function () {
    var pathname = '/'+[this.get('username'), this.get('slug')].join('/');
    var windowPathname = window.location.pathname;
    var title = this.get('title');
    if (windowPathname !== pathname) {
      Ember.run.once(function(){
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

  , bodyDidFocusOut: function () {
      if (this.get('model.isDirty')) this.send('save');
    }

  }

});
