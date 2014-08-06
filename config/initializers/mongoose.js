module.exports = function () {
  var mongoose = require('mongoose');
  mongoose.plugin(require('mongoose-timestamp'));
  mongoose.set('debug', 'development' === process.env.NODE_ENV);
};
