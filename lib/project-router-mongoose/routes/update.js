var inherits = require('util').inherits;
var ProjectRouter = require('project-router');

function UpdateRoute () {}
inherits(UpdateRoute, ProjectRouter.Route);
module.exports = UpdateRoute;

var p = UpdateRoute.prototype;

p.model = function () {
  var id = this.param('id');
  var attrs = this.body()[this.modelName];
  return this.resource.findByIdAndUpdate(id, attrs).exec();
};

p.responseData = function (model) {
  var ret = {};
  ret[this.modelName] = model;
  return ret;
};


