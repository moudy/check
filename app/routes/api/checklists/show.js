var inherits = require('util').inherits;
var ShowRoute = require('project-router-mongoose').show;

function ApiChecklitsShowRoute () {}
inherits(ApiChecklitsShowRoute, ShowRoute);
module.exports = ApiChecklitsShowRoute;

var p = ApiChecklitsShowRoute.prototype;

p.findRecord = function () {
  return this.resource.findOneByWhatever(this.param('id')).exec();
};

p.afterModel = function (model) {
  if (!model) this.reject(404, 'Not found');
};

