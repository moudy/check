import Ember from 'ember';

export default Ember.View.extend({
  classNames: ['p', 'checklist-description', 'editable-field']

, click: function (e) {
    var isLink = !!e.target.href;
    if (this.get('controller.canEdit') && !isLink) {
      this.set('controller.isEditingDescription', true);
    }
  }

});

