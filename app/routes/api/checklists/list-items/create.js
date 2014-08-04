var inherits = require('util').inherits;
var CreateRoute = require('project-router-mongoose').create;
var FindUserChecklist = require('app/query-objects/find-user-checklist');
var ChecklistUpdater = require('app/services/checklist-updater');
var authorize = require('app/services/route-authorization');

function ListItemsCreate () {}
inherits(ListItemsCreate, CreateRoute);
module.exports = ListItemsCreate;

var p = ListItemsCreate.prototype;

p.enter = authorize.user();

p.model = function () {
  var checklistId = this.param('checklistId');
  var attrs = this.body().listItem;

  return FindUserChecklist(checklistId, this.request.user.id)
    .then(function (checklist) {
      return new ChecklistUpdater(checklist).createListItem(attrs);
    });
};

p.responseData = function (checklist) {
  var listItems = checklist.listItems;
  return { listItem: listItems[listItems.length - 1]};
};

