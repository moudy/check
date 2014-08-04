var TESTING_DEBUG;
//TESTING_DEBUG = process.env.TESTING_DEBUG = true;

process.env.NODE_ENV = 'testing';
require('dotenv').load();

var RSVP      = require('rsvp');
var _         = require('underscore');
var fixtures  = require('./fixtures');
var db        = require('../config/db');
var chai      = require('chai');
var mongoose  = require('mongoose');
var clearDB   = require('mocha-mongoose')(db.MONGO_URI);

var Promise = RSVP.Promise;

mongoose.set('debug', TESTING_DEBUG);

global._ = _;
global.expect = chai.expect;
global.fixtures = fixtures;

global.resetDB = function () {
  return new Promise (function (resolve, reject) {
    clearDB(function () {
      if (mongoose.connection.db) return resolve();
      db.connect(function () { resolve(); });
    });
  });
};

global.createModel = function(Model, data, name) {
  return function () {
    var context = this;
    return new Promise (function (resolve, reject) {
      Model.create(data, function (err, doc) {
        if (err) return done(err);
        if (_.isArray(data)) {
          doc = _.toArray(arguments);
          doc.shift();
        }
        context[name] = doc;
        resolve(doc);
      });
    });
  };
};

global.expectCount = function(Model, count) {
  return function () {
    return new Promise (function (resolve, reject) {
      Model.count(function (err, count_) {
        expect(count_).to.eq(count);
        resolve();
      });
    });
  };
};
