var Route = require('project-router').Route;

module.exports = Route.extend({

  model: function () {
    return this.resource.count({userId: this.param('userId')}).exec();
  }

, responseData: function (model) {
    return {
      total: model
    };
  }

});
