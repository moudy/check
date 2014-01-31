var _ = require('underscore');

function ListItemsReorderer (checklist) {
  this.checklist = checklist;
}

module.exports = ListItemsReorderer;

ListItemsReorderer.reorder = function (checklist, orderedIds) {
  return new ListItemsReorderer(checklist).reorder(orderedIds);
};

var p = ListItemsReorderer.prototype;

p.orderedIds = function () {
  return _.chain(this.checklist.listItems)
    .sortBy(function (li) { return li.index; })
    .pluck('id').value();
};

p.reorder = function (orderedIds) {
  orderedIds || (orderedIds = this.orderedIds());
  for (var i = 0, len = orderedIds.length; i < len; i++) {
    this.checklist.listItems.id(orderedIds[i]).index = i;
  }
};

