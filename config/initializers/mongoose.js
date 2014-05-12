module.exports = function () {
  var mongoose = require('mongoose');
  mongoose.plugin(require('mongoose-timestamp'));
};
