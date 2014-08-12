import Ember from 'ember';

export default Ember.ObjectController.extend({

  isCompleted: function (key, value) {
    var lsKey = 'ListItem:'+this+':isCompleted';
    if (window.localStorage) {
      if (arguments.length > 1) window.localStorage.setItem(lsKey, value);
      return window.localStorage.getItem(lsKey) === 'true';
    } else {
      if (arguments.length > 1) this.set(key, value);
      return this.get(key) === 'true';
    }
  }.property()

});

