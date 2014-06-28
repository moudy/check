import Ember from 'ember';
import Sortable from '../../mixins/sortable';

export default Ember.CollectionView.extend(Sortable, {
  tagName: 'ul'

, classNames: ['checklist-list-items-container', 'content-width']

, itemViewClass: 'checklists/list-item'

, contentBinding: 'controller'

, onSortUpdate: function () {
    var listItemIds = this.$().sortable('toArray', {attribute: 'data-id'});
    this.get('controller').send('reorder', listItemIds);
  }

});
