var app    = require('../../app').app;
var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);

module.exports = session({
  secret: app.get('cookieSecret')
, maxAge: new Date(Date.now() + 3600000)
, store: new MongoStore({ url: app.get('MONGO_URI') })
});


