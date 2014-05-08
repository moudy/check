var inherits = require('util').inherits;
var ProjectRouter = require('project-router');

function ShowRoute () {}
inherits(ShowRoute, ProjectRouter.Route);
module.exports = ShowRoute;

var p = ShowRoute.prototype;

p.model = function () {
  return this.resource.findById(this.param('id')).exec();
};

p.responseData = function (model) {
  var ret = {};
  ret[this.modelName] = model;
  return ret;
};

