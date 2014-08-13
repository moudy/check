import Ember from 'ember';

var MAX_TITLE_LENGTH = 40;
var TITLE_SEPARATOR = '...';

export default Ember.Component.extend({

  classNames: ['checklist-delete-button']

, buttonText: 'Delete Checklist'

, condensedTitle: function () {
    var title = this.get('checklist.title');
    var titleLen = title.length;
    if (titleLen < MAX_TITLE_LENGTH) return title;
    var len = (MAX_TITLE_LENGTH / 2) - TITLE_SEPARATOR.length;
    var start = title.substr(0, len);
    var end = title.substr(titleLen - len, titleLen);
    return [start.trim(), end.trim()].join(TITLE_SEPARATOR);
  }.property('checklist.title')

, confirmText: function () {
    return `Yes, delete "${this.get('condensedTitle')}"`;
  }.property('checklist')

, cancelText: 'Cancel'

, actions: {
    deleteChecklist: function () {
      this.set('showConfirmation', true);
    }

  , cancel: function () {
      this.set('showConfirmation', false);
    }

  , confirm: function () {
      this.sendAction();
    }
  }

});
