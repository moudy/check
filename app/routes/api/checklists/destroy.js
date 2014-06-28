
var DestryRoute = require('project-router-mongoose').destroy;

module.exports = DestryRoute.extend({

  findRecord: function () {
    var user = this.request.user;
    return this.resource.findOne({
      _id: this.param('id')
    , userId: user.id
    }).exec();
  }

});
