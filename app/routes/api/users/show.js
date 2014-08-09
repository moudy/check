var Promise = require('rsvp').Promise;
var ShowRoute = require('project-router-mongoose').show;

module.exports = ShowRoute.extend({

  model: function () {
    return this.resource.findOneByWhatever(this.param('id')).exec();
  }

, afterModel: function (user) {
    if (user.name) return;
    // Remove this jank when names are all there
    return new Promise(function (resolve) {
      return this.resource.findOneByWhatever(this.param('id'))
        .select('githubProfileRaw').exec().then(function (user) {
          user.name = JSON.parse(user.githubProfileRaw).name;
          user.save(function () { resolve(); });
        });
    }.bind(this));
  }

});
