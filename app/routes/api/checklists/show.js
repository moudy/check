var RSVP = require('rsvp');
var ShowRoute = require('project-router-mongoose').show;

module.exports = ShowRoute.extend({

  findRecord: function () {
    return this.resource.findOneByWhatever(this.param('id')).exec();
  }

, afterModel: function (model) {
    if (!model) this.reject(404, 'Not found');
  }

});
