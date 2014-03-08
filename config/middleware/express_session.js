var express    = require('express');
var MongoStore = require('connect-mongo')(express);

module.exports = function (app) {
  var mongoStore = new MongoStore({url: app.get('MONGO_URI')});

  return express.session({
    secret: 'checkmate'
  , maxAge: new Date(Date.now() + 3600000)
  , store: mongoStore
  });
};
