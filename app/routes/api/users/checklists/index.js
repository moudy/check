var IndexRoute = require('project-router-mongoose').index;
var FindUserChecklists = require('app/query-objects/find-user-checklists');

module.exports = IndexRoute.extend({

  model: function () {
    return FindUserChecklists(this.param('userId'), this.request.query);
  }

});
