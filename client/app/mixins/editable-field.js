import Ember from 'ember';

export default Ember.Mixin.create({
  notifyParentOnFocusOut: function () {
    this.get('parentView').send('childViewDidFocusOut', this);
  }.on('focusOut')
});
