var path = require('path');
var view = require('./view');

exports.configure = function (app) {
  // Make sure app has environment
  app.set('environment', process.env.NODE_ENV || 'development');

  app.set('title', 'check');
  app.set('cookieSecret', 'sushisushi');

  // Configure environment specific settings
  var environmentPath = path.join(__dirname, 'environments', app.get('environment'));
  require(environmentPath).configure(app);

  // Setup view path and engine
  app.set('views', path.join(__dirname, '..', 'app', 'views'));
  app.engine('.hbs', view.engine);
  app.set('view engine', '.hbs');
};

