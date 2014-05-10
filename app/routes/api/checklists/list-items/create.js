var RSVP = require('rsvp');
var inherits = require('util').inherits;
var Checklist = require('app/models/checklist');
var CreateRoute = require('project-router-mongoose').CreateRoute;

function ListItemsCreate () {}
inherits(ListItemsCreate, CreateRoute);
module.exports = ListItemsCreate;

var p = ListItemsCreate.prototype;

p.model = function () {
  var checklistId = this.param('checklistId');
  var attrs = this.body().listItem;

  return new RSVP.Promise(function(resolve, reject) {
    Checklist.findById(checklistId, function (err, checklist) {
      if (err) return reject(err);
      checklist.listItems.push(attrs);
      checklist.save(function (err, doc) { err ? reject(err) : resolve(doc); });
    });
  });
};

p.responseData = function (checklist) {
  var listItems = checklist.listItems;
  return { listItem: listItems[listItems.length - 1]};
};

