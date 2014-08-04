var inherits = require('util').inherits;
var FindUserChecklist = require('app/query-objects/find-user-checklist');
var ChecklistUpdater = require('app/services/checklist-updater');
var UpdateRoute = require('project-router-mongoose').update;
var authorize = require('app/services/route-authorization');

function ListItemsUpdate () {}
inherits(ListItemsUpdate, UpdateRoute);
module.exports = ListItemsUpdate;

var p = ListItemsUpdate.prototype;

p.enter = authorize.user();

p.model = function () {
  var checklistId = this.param('checklistId');
  var listItemId = this.param('id');
  var attrs = this.body().listItem;

  return FindUserChecklist(checklistId, this.request.user.id)
    .then(function (checklist) {
      return new ChecklistUpdater(checklist)
        .updateListItem(listItemId, attrs);
    });
};

p.responseData = function (model) {
  var doc = model.listItems.id(this.param('id'));
  return {listItem: doc};
};
