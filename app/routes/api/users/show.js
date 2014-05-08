var ShowRoute = require('../../../../lib/project-router-mongoose/routes/show');

var inherits = require('util').inherits;

function UsersShowRoute () {}
inherits(UsersShowRoute, ShowRoute);
module.exports = UsersShowRoute;

var p = UsersShowRoute.prototype;

p.model = function () {
  return this.resource.findOneByWhatever(this.param('id')).exec();
};
