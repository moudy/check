module.exports = function (app) {
  app.set('port', 3088);
  app.set('MONGO_URI', 'mongodb://localhost/check-testing');
  app.set('host', 'check.testing');
  app.set('GITHUB_CLIENT_ID', 'foo');
  app.set('GITHUB_CLIENT_SECRET', 'bar');
};
