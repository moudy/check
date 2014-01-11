/* globals document: false */
var FastClick = require('fastClick');
require('jquery');
global.Handlebars = require('handlebars');
require('./vendor/ember');
require('./templates');

var App = exports.instance = global.App = Em.Application.create();

if (global.history && global.history.pushState) {
  App.Router.reopen({ location: 'history' });
}

Em.$(function() { FastClick.attach(document.body); });
