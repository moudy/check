var inherits = require('util').inherits;
var ProjectRouter = require('project-router');

function IndexRoute () {}
inherits(IndexRoute, ProjectRouter.Route);
module.exports = IndexRoute;

var p = IndexRoute.prototype;

p.model = function () {
  return this.resource.findByIdAndRemove(this.param('id')).exec();
};

p.responseData = function () {
  return {};
};


