var env = require('../env').development;

module.exports = function (app) {
  app.set('port', 3012);
  app.set('MONGO_URI', 'mongodb://localhost/check-development');
  app.set('host', 'check.dev');
  app.set('GITHUB_CLIENT_ID', env.GITHUB_CLIENT_ID);
  app.set('GITHUB_CLIENT_SECRET', env.GITHUB_CLIENT_SECRET);
  require('node-pow')(app);
};
