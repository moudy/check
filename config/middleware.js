var express = require('express');
var path = require('path');
var passport = require('passport');
var expressSession = require('./middleware/express_session');
var passport = require('passport');
var user = require('./middleware/user');

exports.configure = function (app) {

  if ('development' === app.get('env')) {
    app.use(require('./middleware/sass'));
    app.use('/head.js', require('./middleware/head'), {
      noParse: ['Modernizr']
    , insertGlobals:true
    });
    app.use('/app.js', require('./middleware/app'), {
      noParse: ['Ember', 'jquery']
    , insertGlobals:true
    });
  }
  app.use(express.compress());
  app.use(express.favicon(path.join(__dirname, '..', 'public/favicon.ico')));
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser('checkmate'));
  app.use(expressSession);
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
