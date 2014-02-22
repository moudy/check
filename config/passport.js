var User = require('app/models/user');
var GitHubStrategy = require('passport-github').Strategy;
var passport = require('passport');

exports.configure = function (app) {

  var gitHubStrategyOptions = {
    clientID: app.get('GITHUB_CLIENT_ID')
  , clientSecret: app.get('GITHUB_CLIENT_SECRET')
  , callbackURL: 'http://'+app.get('host')+'/auth/github/callback'
  };

  function gitHubStrategyCallback (accessToken, refreshToken, profile, done) {
    var githubProfileRaw = profile._raw;
    var githubProfile = JSON.parse(githubProfileRaw);

    var attrs = {
      githubProfileRaw: profile._raw
    , gravatarId: githubProfile.gravatar_id
    , username: profile.username
    };

    User.findOrCreate({ githubId: profile.id }, attrs, done);
  }

  passport.serializeUser(function(user, cb) {
    cb(null, user.get('username'));
  });

  passport.deserializeUser(function(username, cb) {
    User.findOne({username: username}, cb);
  });

  var gitHubStrategy = new GitHubStrategy(gitHubStrategyOptions, gitHubStrategyCallback);
  passport.use(gitHubStrategy);
};
