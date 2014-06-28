if ('production' !== process.env.NODE_ENV) {
  require('dotenv').load();
}

var app = exports.app = require('express')();
require('./config/boot')(app);

if (!module.parent) {
  require('./config/db').connect();

  app.listen(app.get('port'), function(){
    console.log(
    '"%s" running in "%s" on port %d'
    , app.get('origin')
    , app.get('env')
    , app.get('port')
    );
  });
}
