var Promise = require('rsvp').Promise;
var ShowRoute = require('project-router-mongoose').show;

module.exports = ShowRoute.extend({

  model: function () {
    return this.resource.findOneByWhatever(this.param('id')).exec();
  }

});
