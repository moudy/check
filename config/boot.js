var fs            = require('fs');
var path          = require('path');
var express       = require('express');
var passport      = require('passport');
var bodyParser    = require('body-parser');
var session       = require('express-session');
var MongoStore    = require('connect-mongo')(session);
var projectRouter = require('project-router');
var view          = require('./view');
var db            = require('./db');

module.exports = function (app) {
  var env = process.env;
  // Make sure app has environment
  app.set('environment', env.NODE_ENV || 'development');

  var rootPath = path.join(__dirname, '..');
  var configPath = path.join(rootPath, 'config');
  var assetsPath = path.join(rootPath, 'public', 'assets');
  var initializersPath = path.join(configPath, 'initializers');

  app.set('title', 'check');
  app.set('port', env.PORT);
  app.set('origin', env.ORIGIN);
  app.set('assetOrigin', env.ASSET_ORIGIN);
  app.set('ASSETS', fs.readdirSync(assetsPath));

  // Setup view path and engine
  app.set('views', path.join(rootPath, 'app', 'views'));
  app.engine('.hbs', view.engine);
  app.set('view engine', '.hbs');

  // Load initializers
  fs.readdirSync(initializersPath).forEach(function (file) {
    require(path.join(initializersPath, file))(app);
  });

  // Middleware
  if ('development' === app.get('env')) {
    require('node-pow')(app);
  }

  app.use(require('serve-favicon')(path.join(rootPath, 'public/favicon.ico')));
  app.use(express.static(path.join(rootPath, 'public')));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(require('cookie-parser')(env.COOKIE_SECRET));
  app.use(require('method-override')());

  app.use(session({
    secret: env.COOKIE_SECRET
  , maxAge: new Date(Date.now() + 3600000)
  , store: new MongoStore({ url: db.MONGO_URI })
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  if ('development' === app.get('env')) {
    app.use(require('morgan')('dev'));
    app.use(require('../lib/body_logger'));
    app.use(require('errorhandler')());
  }

  app.use(function (req, res, next) {
    var user = req.user;
    res.locals.ENV = {};
    res.locals.ENV[app.get('env')] = true;
    if (user) {
      res.locals.ENV.currentUser = user.toJSON();
    }
    next();
  });

  app.use(require('./middleware/user'));

  app.get('/auth/github', passport.authenticate('github'), function(){});
  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
    res.redirect('/');
  });

  var router = projectRouter.map(require('./routes'));

  if ('development' === app.get('env')) {
    app.use('/routes', require('project-router-viewer')(router));
  }

  app.use(router);
};

