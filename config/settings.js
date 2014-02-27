var _ = require('underscore');
var path = require('path');

var view = require('./view');
var env = require('./env');

exports.configure = function (app) {
  _.each(env, function (value, key) { app.set(key, value); });
  app.set('port', process.env.PORT || 3012);
  app.set('title', 'check');
  app.set('views', path.join(__dirname, '..', 'app', 'views'));
  app.engine('.hbs', view.engine);
  app.set('view engine', '.hbs');

  if ('development' === app.get('env')) {
    var mongoose = require('mongoose');
    mongoose.set('debug', true);
    require('node-pow')(app);
    app.set('host', app.get('title')+'.dev');
  } else if ('production' === app.get('env')) {
    app.set('host', 'chck.herokuapp.com');
  }
};

