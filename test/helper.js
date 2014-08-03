var TESTING_DEBUG;
//TESTING_DEBUG = process.env.TESTING_DEBUG = true;

process.env.NODE_ENV = 'testing';
require('dotenv').load();

var _         = require('underscore');
var app       = require('../app').app;
var fixtures  = require('./fixtures');
var db        = require('../config/db');
var chai      = require('chai');
var mongoose  = require('mongoose');
var clearDB   = require('mocha-mongoose')(db.MONGO_URI);

mongoose.set('debug', TESTING_DEBUG);

global._ = _;
global.expect = chai.expect;
global.fixtures = fixtures;

global.resetDB = function (done) {
  clearDB(function () {
    if (mongoose.connection.db) return done();
    db.connect(done);
  });
};

global.createModel = function(Model, data, name, cb) {
  return function (done) {
    var context = this;
    Model.create(data, function (err, doc) {
      if (err) return done(err);
      if (_.isArray(data)) {
        doc = _.toArray(arguments);
        doc.shift();
      }
      context[name] = doc;
      done();
    });
  };
};

global.expectCount = function(Model, count, cb) {
  return function (done) {
    Model.count(function (err, count_) {
      expect(count_).to.eq(count);
      cb ? cb(err) : done(err);
    });
  };
};
