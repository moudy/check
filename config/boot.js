var fs = require('fs');
var path = require('path');
var express = require('express');
var passport = require('passport');
var view = require('./view');

module.exports = function (app) {
  // Make sure app has environment
  app.set('environment', process.env.NODE_ENV || 'development');

  var rootPath = path.join(__dirname, '..');
  var configPath = path.join(rootPath, 'config');
  var environmentPath = path.join(configPath, 'environments', app.get('environment'));
  var initializersPath = path.join(configPath, 'initializers');

  app.set('title', 'check');
  app.set('cookieSecret', 'sushisushi');

  // Setup view path and engine
  app.set('views', path.join(rootPath, 'app', 'views'));
  app.engine('.hbs', view.engine);
  app.set('view engine', '.hbs');

  // Configure environment specific settings
  require(environmentPath)(app);

  // Load initializers
  fs.readdirSync(initializersPath).forEach(function (file) {
    require(path.join(initializersPath, file))(app);
  });

  // Middleware

  app.use(require('serve-favicon')(path.join(rootPath, 'public/favicon.ico')));

  if ('development' === app.get('env')) {
    app.use('/assets', require('broccoli-middleware'));
  } else {
    app.use(require('./assets').handle);
  }

  app.use(express.static(path.join(rootPath, 'public')));

  app.use(require('body-parser')());
  app.use(require('cookie-parser')());
  app.use(require('method-override')());

  app.use(require('cookie-parser')('checkmate'));
  app.use(require('./middleware/session'));
  app.use(passport.initialize());
  app.use(passport.session());

  if ('development' === app.get('env')) {
    app.use(require('morgan')('dev'));
    app.use(require('../lib/body_logger'));
  }

  app.use(function (req, res, next) {
    res.locals.ENV = {};
    res.locals.ENV[app.get('env')] = true;
    next();
  });

  app.use(require('./middleware/user'));

  if ('development' === app.get('env')) {
    app.use(require('errorhandler')());
  }

  app.get('/auth/github', passport.authenticate('github'), function(){});
  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
    res.redirect('/');
  });

  app.use(require('./router'));
};

