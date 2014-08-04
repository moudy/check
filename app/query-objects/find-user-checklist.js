var RSVP = require('rsvp');
var User = require('app/models/user');
var Checklist = require('app/models/checklist');

module.exports = function (checklistId, userId) {
  if (userId instanceof User) userId = userId.id;
  var findOne = RSVP.denodeify(Checklist.findOne.bind(Checklist));
  return findOne({_id: checklistId, userId: userId});
};
