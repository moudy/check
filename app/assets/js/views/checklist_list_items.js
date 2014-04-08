var App = require('../app').instance;

App.ChecklistListItemsView = Em.CollectionView.extend(App.Sortable, {
  tagName: 'ul'

, classNames: ['checklist-list-items-container', 'content-width']

, itemViewClass: App.ChecklistListItemView

, contentBinding: 'controller'

, onSortUpdate: function () {
    var listItemIds = this.$().sortable('toArray', {attribute: 'data-id'});
    this.get('controller').send('reorder', listItemIds);
  }

});
