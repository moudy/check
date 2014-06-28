import Ember from 'ember';

export default Ember.Mixin.create({

  setupSortable: function () {
    this.$().sortable({
      placeholder: 'checklist-list-item-placeholder'
    , handle: '.sort-handle'
    , update: this.onSortUpdate.bind(this)
    , scroll: false
    , start: function (event, ui) { ui.placeholder.height(ui.item.height()); }
    });
  }.on('didInsertElement')

, destroySortable: function () {
    this.$().sortable('destroy');
  }.on('willDestroyElement')

});
