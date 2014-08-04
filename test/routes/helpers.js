var supertest = require('supertest');
var app = require('../../app');
var request = require('express/lib/request');

var RSVP = require('rsvp');
var Promise = RSVP.Promise;

exports.get = function (endpoint) {
  return new Promise(function (resolve, reject) {
    supertest(app)
      .get(endpoint)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        if (err) return reject(err);
        resolve(res);
      });
  });
};

exports.post = function (endpoint, data) {
  return new Promise(function (resolve, reject) {
    supertest(app)
      .post(endpoint)
      .send(data)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        if (err) return reject(err);
        resolve(res);
      });
  });
};

exports.put = function (endpoint, data) {
  return new Promise(function (resolve, reject) {
    supertest(app)
      .put(endpoint)
      .send(data)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        if (err) return reject(err);
        resolve(res);
      });
  });
};

exports.del = function (endpoint) {
  return new Promise(function (resolve, reject) {
    supertest(app)
      .delete(endpoint)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        if (err) return reject(err);
        resolve(res);
      });
  });
};

exports.signIn = function (user) {
  request.user = user;
};

exports.signOut = function () {
  delete request.user;
};
