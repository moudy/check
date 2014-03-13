global.jQuery = global.$ = require('jquery');

require('jquery.transit');
global.Handlebars = require('handlebars');
require('./vendor/ember');
require('./vendor/ember-data');
require('./templates');
require('fastClick');

require('./lib/handlebars_helpers').register(Em.Handlebars);

var App = exports.instance = global.App = Em.Application.create({
  ready: function(){
    this.register('session:current', App.Session, {singleton: true});
    this.inject('controller', 'session', 'session:current');
    this.inject('route', 'session', 'session:current');
  }
});

App.Session = Em.Controller.extend({
  isCurrentUser: function (userId) {
    if (userId && 'string' !== typeof userId) userId = userId.get('id');
    return userId && this.get('user.id') === userId;
  }
});

if (global.history && global.history.pushState) {
  App.Router.reopen({ location: 'history' });
}

require('./mixins');
require('./application_adapter');
require('./views');
require('./models');
require('./routes');
require('./controllers');

App.Router.map(function () {
  this.route('index', {path: '/'});
  this.route('users.show', {path: '/:username'});
  this.route('checklists.show', {path: '/:username/:id'});

  this.route('checklists.new', {path: '/list/new'});

  this.route('signout');
});

