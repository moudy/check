import Ember from 'ember';

export default Ember.TextArea.extend({

  becomeFocused: function() {
    var $el = this.$();
    if (this.get('focusOnInsert')) $el.focus();
    $el.val($el.val());
  }.on('didInsertElement')

, notifyFocusOut: function () {
    this.sendAction('action', this);
  }.on('focusOut')

});
