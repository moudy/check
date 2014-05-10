var inherits = require('util').inherits;
var RSVP = require('rsvp');
var _ = require('underscore');
var Checklist = require('app/models/checklist');
var UpdateRoute = require('project-router-mongoose').UpdateRoute;

function ListItemsUpdate () {}
inherits(ListItemsUpdate, UpdateRoute);
module.exports = ListItemsUpdate;

var p = ListItemsUpdate.prototype;

p.model = function () {
  var checklistId = this.param('checklistId');
  var listItemId = this.param('id');
  var attrs = this.body().listItem;

  return new RSVP.Promise(function(resolve, reject) {
    Checklist.findOne({_id: checklistId}, function (err, checklist) {
      var doc = checklist.listItems.id(listItemId);
      _.extend(doc, attrs);
      checklist.save(function (err, doc) { err ? reject(err) : resolve(doc); });
    });
  });
};

p.responseData = function (model) {
  var doc = model.listItems.id(this.param('id'));
  return {listItem: doc};
};
