var express = require('express');
var path = require('path');
var passport = require('passport');
var expressSession = require('./middleware/express_session');
var passport = require('passport');
var user = require('./middleware/user');
var assetServer = require('./middleware/asset-server');

exports.configure = function (app) {
  app.use(express.favicon(path.join(__dirname, '..', 'public/favicon.ico')));

  if ('development' === app.get('env')) app.use(assetServer);

  app.use(express.static(path.join(__dirname, '..', 'public')));
  if ('production' === app.get('env')) app.use(express.static(path.join(__dirname, '..', 'assets')));

  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser('checkmate'));
  app.use(expressSession(app));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.logger('dev'));

  if ('development' === app.get('env')) app.use(require('../lib/body_logger'));

  app.use(function (req, res, next) {
    res.locals.ENV = {};
    res.locals.ENV[app.get('env')] = true;
    next();
  });

  app.use(user);
  app.use(app.router);

  if ('development' === app.get('env')) app.use(express.errorHandler());
};
