var inherits = require('util').inherits;
var RSVP = require('rsvp');
var Route = require('project-router-mongoose').show;
var Checklist = require('app/models/checklist');
var ListItemsReorderer = require('app/services/list_items_reorderer');

function ApiChecklistsReorderRoute () {}
inherits(ApiChecklistsReorderRoute, Route);
module.exports = ApiChecklistsReorderRoute;

var p = ApiChecklistsReorderRoute.prototype;

p.model = function () {
  var listItemIds = this.body().listItemsIds;
  var checklistId = this.param('id');
  return new RSVP.Promise(function(resolve, reject) {
    Checklist.findById(checklistId, function (error, checklist) {
      ListItemsReorderer.reorder(checklist, listItemIds);
      checklist.save(function (err, doc) { err ? reject(err) : resolve(doc); });
    });
  });
};

