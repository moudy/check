var express    = require('express');
var MongoStore = require('connect-mongo')(express);

var db = require('../db');

var mongoStore = new MongoStore({url: db.mongoUri});

module.exports = express.session({
  secret: 'checkmate'
, maxAge: new Date(Date.now() + 3600000)
, store: mongoStore
});
