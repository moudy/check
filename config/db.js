var mongoose = require('mongoose');

var mongoUri = exports.mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/check_development';

exports.configure = function () {
  mongoose.connect(mongoUri);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'db connection error:', mongoUri));
  db.on('open', console.error.bind(console, 'db connection open:', mongoUri));
  return db;
};
