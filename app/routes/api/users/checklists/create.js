var CreateRoute = require('project-router-mongoose').create;

module.exports = CreateRoute.extend({

  recordAttributes: function () {
    var user = this.request.user;
    var params = this.param('checklist');
    params.userId = user.id;
    params.username = user.username;
    return params;
  }

});

