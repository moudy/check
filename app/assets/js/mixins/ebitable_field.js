var App = require('../app').instance;

App.EditableField = Em.Mixin.create({
  //autoFocus: function(){
    //this.$().focus();
  //}.on('didInsertElement')

  notifyParentOnFocusOut: function () {
    this.get('parentView').send('childViewDidFocusOut', this);
  }.on('focusOut')

});
