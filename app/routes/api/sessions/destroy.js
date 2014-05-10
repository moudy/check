var inherits = require('util').inherits;
var Route = require('project-router-mongoose').Route;

function ApiSessionsDestroyRoute () {}
inherits(ApiSessionsDestroyRoute, Route);
module.exports = ApiSessionsDestroyRoute;

var p = ApiSessionsDestroyRoute.prototype;

p.enter = function () {
  this.request.logout();
};

