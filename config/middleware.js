var express = require('express');
var path = require('path');
var passport = require('passport');
var passport = require('passport');
var user = require('./middleware/user');
var assetServer = require('./middleware/asset-server');

exports.configure = function (app) {
  var rootPath = path.join(__dirname, '..');
  app.use(require('serve-favicon')(path.join(rootPath, 'public/favicon.ico')));

  if ('development' === app.get('env')) {
    app.use(assetServer);
  } else {
    app.use('/assets', express.static(path.join(rootPath, 'assets')));
  }

  app.use(express.static(path.join(rootPath, 'public')));

  app.use(require('body-parser')());
  app.use(require('cookie-parser')());
  app.use(require('method-override')());

  app.use(require('cookie-parser')('checkmate'));
  app.use(require('./middleware/session'));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(require('morgan')('dev'));
  if ('development' === app.get('env')) {
    app.use(require('morgan')('dev'));
    app.use(require('../lib/body_logger'));
  }

  app.use(function (req, res, next) {
    res.locals.ENV = {};
    res.locals.ENV[app.get('env')] = true;
    next();
  });

  app.use(user);

  if ('development' === app.get('env')) {
    app.use(require('errorhandler')());
  }
};
