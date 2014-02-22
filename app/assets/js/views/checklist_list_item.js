var App = require('../app').instance;

App.ChecklistListItemView = Em.View.extend({
  templateName: 'checklist_list_item'

, tagName: 'li'

, classNames: 'checklist-list-item'

, classNameBindings: [
    'controller.isActive'
  , 'controller.isEditingMd'
  , 'controller.isCompleted'
  , 'controller.animateMoveFlash'
  ]

, click: function (e) {
    var nodeName = e.target.nodeName.toLowerCase();
    if ('code' === nodeName) return;
    if ('a' === nodeName) return;
    var isEditing = this.get('controller.isEditing');
    if (!isEditing) {
      this.get('controller').send('toggleCompletion');
    }
  }

, checkFocus: function () {
    var c = this.get('controller');
    if (c.get('isNew') && c.get('isEditing')) c.set('isEditingMd', true);
  }.on('didInsertElement')

, autoFocus: function () {
    if (!this.get('controller.isEditingMd')) return;
    Em.run.scheduleOnce('afterRender', this, function () {
      this.$('textarea').focus();
    });
  }.observes('controller.isEditingMd')

, actions: {
    childViewDidFocusOut: function () {
      this.set('controller.isEditingMd', false);
      this.get('controller').send('save');
    }

  , editItem: function () {
      this.set('controller.isEditingMd', true);
    }

  , deleteItem: function () {
      this.$().transition({ opacity: 0 }, 300, function () {
        this.controller.send('deleteItem');
      }.bind(this));
    }
  }

});
