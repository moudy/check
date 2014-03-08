var env = require('../env').production;

exports.configure = function (app) {
  app.set('port', process.env.PORT);
  app.set('MONGO_URI', process.env.MONGOLAB_URI);
  app.set('host', 'chck.herokuapp.com');
  app.set('GITHUB_CLIENT_ID', env.GITHUB_CLIENT_ID);
  app.set('GITHUB_CLIENT_SECRET', env.GITHUB_CLIENT_SECRET);
};

