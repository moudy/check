var RSVP = require('rsvp');
var ShowRoute = require('project-router-mongoose').show;

module.exports = ShowRoute.extend({

  findRecord: function () {
    return this.resource.findOneByWhatever(this.param('id')).exec();
  }

, afterModel: function (model) {
    if (!model) this.reject(404, 'Not found');
    if (!model.listItems) return;

    model.body = model.listItems.map(function (i) {
      return i.description;
    }).join('\n[x]\n');

    model.listItems = null;
    var save = RSVP.denodeify(model.save.bind(model));
    return save();
  }

});
