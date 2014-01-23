require('jquery');
require('jquery.transit');
global.Handlebars = require('handlebars');
require('./vendor/ember');
require('./vendor/ember-data');
require('./templates');
require('fastClick');

var App = exports.instance = global.App = Em.Application.create();

if (global.history && global.history.pushState) {
  App.Router.reopen({ location: 'history' });
}

require('./mixins');
require('./views');
require('./models');
require('./routes');
require('./controllers');

App.Router.map(function () {
  this.route('checklist', {path: '/list/:checklistSlug'});
});

