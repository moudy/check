var Route = require('project-router').Route;
var AddRecentlyViewedChecklist = require('app/services/add-recently-viewed-checklist');
var authorize = require('app/services/route-authorization');

module.exports = Route.extend({

  enter: authorize.user()

, model: function () {
    return AddRecentlyViewedChecklist
      .add(this.request.user, this.param('checklistId'));
  }

});

