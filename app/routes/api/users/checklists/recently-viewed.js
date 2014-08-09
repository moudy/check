var IndexRoute = require('project-router-mongoose').index;
var Checklist = require('app/models/checklist');
var authorize = require('app/services/route-authorization');

module.exports = IndexRoute.extend({

  enter: authorize.user()

, model: function () {
    var checklistIds = this.request.user.recentlyViewed || [];
    return Checklist.where('_id').in(checklistIds).exec().then(function (docs) {
      var ret = [];
      docs.forEach(function (doc) {
        var i = checklistIds.indexOf(doc.id);
        ret[i] = doc;
      });

      return ret;
    });
  }

});

