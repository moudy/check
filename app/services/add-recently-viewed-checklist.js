var RSVP = require('rsvp');

var AddRecentlyViewedChecklist = module.exports = function (user) {
  this.user = user;
};

AddRecentlyViewedChecklist.RECENTLY_VIEWED_MAX = 3;

AddRecentlyViewedChecklist.add = function (user, checklistId) {
  return new AddRecentlyViewedChecklist(user).add(checklistId);
};

AddRecentlyViewedChecklist.prototype.add = function (checklistId) {
  var user = this.user;
  var recentlyViewed = user.recentlyViewed || [];

  recentlyViewed = recentlyViewed.filter(function (item) {
    return item !== checklistId;
  });

  recentlyViewed.unshift(checklistId);
  user.recentlyViewed = recentlyViewed.slice(0,3);

  var save = RSVP.denodeify(user.save.bind(user));
  return save();
};
