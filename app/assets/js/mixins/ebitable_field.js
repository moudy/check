var App = require('../app').instance;

App.EditableField = Em.Mixin.create({
  notifyParentOnFocusOut: function () {
    this.get('parentView').send('childViewDidFocusOut', this);
  }.on('focusOut')
});
