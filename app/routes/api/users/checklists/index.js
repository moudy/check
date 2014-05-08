var IndexRoute = require('../../../../../lib/project-router-mongoose/routes/index');
var inherits = require('util').inherits;

function ApiUsersChecklistsRoute () {}
inherits(ApiUsersChecklistsRoute, IndexRoute);
module.exports = ApiUsersChecklistsRoute;

var p = ApiUsersChecklistsRoute.prototype;

p.model = function () {
  return this.resource.find({userId: this.param('userId')}).exec();
};

