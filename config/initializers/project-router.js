var projectRouter = require('project-router');
var projectRouterMongoose = require('project-router-mongoose');

module.exports = function () {
  projectRouter.routeGenerator(function (options) {
    var route = projectRouterMongoose[options.action];
    return route || projectRouter.Route;
  });
};
