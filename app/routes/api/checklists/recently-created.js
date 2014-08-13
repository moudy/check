var IndexRoute = require('project-router-mongoose').index;
var Checklist = require('app/models/checklist');

var LIMIT = 10;

module.exports = IndexRoute.extend({

  model: function () {
    return Checklist.find({}).sort('-createdAt').limit(LIMIT).exec();
  }

});


