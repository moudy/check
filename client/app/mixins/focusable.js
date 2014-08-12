import Ember from 'ember';

export default Ember.Mixin.create({

  becomeFocused: function() {
    var $el = this.$();
    if (this.get('focusOnInsert')) $el.focus();
    $el.val($el.val());
  }.on('didInsertElement')

, notifyFocusOut: function () {
    this.sendAction('action', this);
  }.on('focusOut')

});

