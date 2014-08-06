import Ember from 'ember';

export default Ember.View.extend({

  templateName: 'list-items/item'

, tagName: 'li'

, controllerBinding: 'content'

, classNames: 'checklist-list-item'

, id: function () {
    return this.get('content.id');
  }.property('content')

, attributeBindings: ['id:data-id']

, classNameBindings: [
    'controller.isActive'
  , 'controller.isEditing'
  , 'controller.isCompleted'
  , 'controller.animateMoveFlash'
  ]

, checkState: function () {
    if (this.get('controller.isNew')) this.get('controller').send('edit');
  }.on('didInsertElement')

, autoFocus: function () {
    if (!this.get('controller.isEditing')) return;
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.$('textarea').focus();
    });
  }.observes('controller.isEditing')

, actions: {
    delete: function () {
      if (!window.confirm('Are you sure?')) return;
      this.$().transition({ opacity: 0 }, 300, function () {
        this.get('controller').send('delete_');
      }.bind(this));
    }
  }

});
