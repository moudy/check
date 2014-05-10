var ShowRoute = require('project-router-mongoose').ShowRoute;

var inherits = require('util').inherits;

function UsersShowRoute () {}
inherits(UsersShowRoute, ShowRoute);
module.exports = UsersShowRoute;

var p = UsersShowRoute.prototype;

p.model = function () {
  return this.resource.findOneByWhatever(this.param('id')).exec();
};
