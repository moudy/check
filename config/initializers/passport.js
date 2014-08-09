var User = require('app/models/user');
var GitHubStrategy = require('passport-github').Strategy;
var passport = require('passport');
var env = process.env;

module.exports = function () {

  var gitHubStrategyOptions = {
    clientID: env.GITHUB_CLIENT_ID
  , clientSecret: env.GITHUB_CLIENT_SECRET
  , callbackURL: env.ORIGIN+'/auth/github/callback'
  };

  function gitHubStrategyCallback (accessToken, refreshToken, profile, done) {
    var githubProfileRaw = profile._raw;
    var githubProfile = JSON.parse(githubProfileRaw);

    var attrs = {
      githubProfileRaw: profile._raw
    , gravatarId: githubProfile.gravatar_id
    , username: profile.username
    , name: profile.name
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
