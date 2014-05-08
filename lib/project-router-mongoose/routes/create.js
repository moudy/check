var inherits = require('util').inherits;
var ProjectRouter = require('project-router');

function IndexRoute () {}
inherits(IndexRoute, ProjectRouter.Route);
module.exports = IndexRoute;

var p = IndexRoute.prototype;

p.model = function () {
  var attrs = this.body()[this.modelName];
  return this.resource.create(attrs).exec();
};

p.responseData = function (model) {
  var ret = {};
  ret[this.modelName] = model;
  return ret;
};


