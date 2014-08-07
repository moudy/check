import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['action-bar']

, update: function () {
    Ember.run.once(this, function () {
      var sortValue = this.get('sortValue') || null;
      this.get('sortOptions').forEach(function (option) {
        option.set('active', option.get('value') === sortValue);
      }, this);
    });
  }.observes('sortValue').on('init')

, actions: {
    setSort: function (option) {
      this.set('sortValue', option.get('value') || null);
      this.sendAction();
    }
  }

});
