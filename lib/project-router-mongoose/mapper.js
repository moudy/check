var inherits = require('util').inherits;
var express = require('express');
var ProjectRouter = require('project-router');

var routes = {
  index: require('./routes/index')
, show: require('./routes/show')
, new: require('./routes/new')
, create: require('./routes/create')
, edit: require('./routes/edit')
, update: require('./routes/update')
, destroy: require('./routes/destroy')
};

function Mapper() {
  Mapper.super_.apply(this, arguments);
}
inherits(Mapper, ProjectRouter.Mapper);

module.exports = Mapper;

Mapper.map = function (options, fn) {
  if (typeof options === 'function') {
    fn = options;
    options = {};
  }

  var router = express.Router();
  var mapper = new Mapper(router, options);
  fn.call(mapper);

  return router;
};

var p = Mapper.prototype;

p.mapper = Mapper;

Mapper.prototype.generateRoute = function (options) {
  var route = routes[options.action];
  if (!route) route = Mapper.super_.prototype.generateRoute.apply(this, arguments);
  return route;
};

p.setupRoute = function (route, options) {
  Mapper.super_.prototype.setupRoute.apply(this, arguments);

  if (options.resource && !route.resource) {
    route.resource = options.resource;
  }

  if (route.resource && !route.collectionName) {
    route.collectionName = options.resource.collection.name;
  }

  if (route.resource && !route.modelName) {
    route.modelName = options.resource.modelName.toLowerCase();
  }

};
