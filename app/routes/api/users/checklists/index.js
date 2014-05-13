var IndexRoute = require('project-router-mongoose').index;
var inherits = require('util').inherits;

function ApiUsersChecklistsRoute () {}
inherits(ApiUsersChecklistsRoute, IndexRoute);
module.exports = ApiUsersChecklistsRoute;

var p = ApiUsersChecklistsRoute.prototype;

p.model = function () {
  return this.resource.find({userId: this.param('userId')}).exec();
};

