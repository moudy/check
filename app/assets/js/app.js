
require('jquery.ui');
require('jquery.transit');

global.EmberENV = {FEATURES: {'ember-document-title': true}};

require('fastClick');

require('./lib/handlebars_helpers').register(Em.Handlebars);

var App = exports.instance = global.App = Em.Application.create({
  ready: function(){
    this.register('session:current', App.Session, {singleton: true});
    this.inject('controller', 'session', 'session:current');
    this.inject('route', 'session', 'session:current');
  }
});

require('./mixins');
require('./adapters/application');
require('./views');
require('./models');
require('./routes');
require('./controllers');
require('./router');

