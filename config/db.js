var mongoose = require('mongoose');

var env = process.env;

var MONGO_URI = exports.MONGO_URI = env.MONGO_URI || env.MONGOLAB_URI;

exports.connect = function (done) {
  if ('development' === env.NODE_ENV) mongoose.set('debug', true);
  var db = mongoose.connect(MONGO_URI).connection;

  db.on('error', function (err) {
    console.log('MongoDB connection error', MONGO_URI, err);
    done && done(err);
  });

  db.on('open', function () {
    console.log('MongoDB connection open at:', MONGO_URI);
    done && done();
  });

  return db;
};
