var Route = require('project-router').Route;

module.exports = Route.extend({

  enter: function () {
    this.request.logout();
  }

});

