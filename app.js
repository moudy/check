var app = exports.app = require('express')();
require('./config/boot')(app);

if (!module.parent) {
  require('./config/db').connect(app);

  app.listen(app.get('port'), function(){
    console.log(
    '"http://%s" running in "%s" on port %d'
    , app.get('host')
    , app.get('env')
    , app.get('port')
    );
  });
}
