//var requireDirectory = require('node-require-directory');
//var controllers = requireDirectory('app/controllers');
var passport = require('passport');
var ProjectRouter = require('../lib/project-router-mongoose');
var Checklist = require('app/models/checklist');
var User = require('app/models/user');

exports.configure = function (app) {

  app.get('/auth/github', passport.authenticate('github'), function(){});
  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
    res.redirect('/');
  });

  var router = ProjectRouter.map({routesPath: 'app/routes/api'}, function () {
    this.namespace('api', function () {
      this.resources('users', {only: ['show'], resource: User}, function () {
        this.resources('checklists', {only: ['index', 'create'], resource: Checklist });
      });

      this.resources('checklists', {only: ['show', 'update'], resource: Checklist}, function () {
        this.resources('list-items', {only: ['update', 'create', 'destroy'] });
      });
    });

    this.get('/', 'index');
    this.get('/:id', 'index');
    this.get('/:username/:checklistSlug', 'index');
  });

  app.use(router);

};
