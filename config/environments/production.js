module.exports = function (app) {
  app.set('port', process.env.PORT);
  app.set('MONGO_URI', process.env.MONGOLAB_URI);
  app.set('host', 'chck.herokuapp.com');
  app.set('GITHUB_CLIENT_ID', process.env.GITHUB_CLIENT_ID);
  app.set('GITHUB_CLIENT_SECRET', process.env.GITHUB_CLIENT_SECRET);
};

