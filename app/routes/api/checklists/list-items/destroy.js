var RSVP = require('rsvp');
var inherits = require('util').inherits;
var Checklist = require('app/models/checklist');
var DestroyRoute = require('project-router-mongoose').destroy;
var ListItemsReorderer = require('app/services/list_items_reorderer');

function ListItemsDestroy () {}
inherits(ListItemsDestroy, DestroyRoute);
module.exports = ListItemsDestroy;

var p = ListItemsDestroy.prototype;

p.model = function () {
  var id = this.param('id');
  var checklistId = this.param('checklistId');

  return new RSVP.Promise(function(resolve, reject) {
    Checklist.findById(checklistId, function (error, checklist) {
      if (error) return reject(error);
      var doc = checklist.listItems.id(id);
      doc.remove();
      ListItemsReorderer.reorder(checklist);
      checklist.save(function (err, doc) { err ? reject(err) : resolve(doc); });
    });
  });
};

p.responseData = function () {
  return {listItem: null};
};

