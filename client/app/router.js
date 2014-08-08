import Ember from 'ember';

var Router = Ember.Router.extend({
  location: 'history'
});

Router.map(function() {
  this.route('index', {path: '/'});

  this.resource('user', {path: '/:username'}, function () {
    this.resource('checklists', {path: '/'}, function () {
      //this.route('new');
    });
    this.route('index', {path: '/'});
  });

  this.resource('checklist', {path: '/:username/:slug'}, function () {
    this.resource('list-items', {path: '/'}, function () {
    });
  });

  this.route('checklists.new', {path: '/new'});

});

export default Router;
