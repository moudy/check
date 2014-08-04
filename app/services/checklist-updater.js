var RSVP = require('rsvp');
var ListItemsReorderer = require('app/services/list_items_reorderer');

var ChecklistUpdater = module.exports = function (checklist) {
  this.checklist = checklist;
};

var p = ChecklistUpdater.prototype;

p.createListItem = function (attrs) {
  this.checklist.listItems.push(attrs);
  return this.save();
};

p.updateListItem = function (id, attrs) {
  var checklist = this.checklist;
  var doc = checklist.listItems.id(id);
  for (var key in attrs) doc[key] = attrs[key];
  return this.save();
};

p.deleteListItem = function (id) {
  var checklist = this.checklist;
  var doc = checklist.listItems.id(id);
  doc.remove();
  ListItemsReorderer.reorder(checklist);
  return this.save();
};

p.save = function () {
  var checklist = this.checklist;
  return RSVP.denodeify(checklist.save.bind(checklist))();
};
