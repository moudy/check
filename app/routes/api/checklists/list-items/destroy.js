var inherits = require('util').inherits;
var DestroyRoute = require('project-router-mongoose').destroy;
var FindUserChecklist = require('app/query-objects/find-user-checklist');
var ChecklistUpdater = require('app/services/checklist-updater');
var authorize = require('app/services/route-authorization');

function ListItemsDestroy () {}
inherits(ListItemsDestroy, DestroyRoute);
module.exports = ListItemsDestroy;

var p = ListItemsDestroy.prototype;

p.enter = authorize.user();

p.model = function () {
  var id = this.param('id');
  var checklistId = this.param('checklistId');

  return FindUserChecklist(checklistId, this.request.user.id)
    .then(function (checklist) {
      return new ChecklistUpdater(checklist).deleteListItem(id);
    });
};

p.responseData = function () {
  return {listItem: null};
};

