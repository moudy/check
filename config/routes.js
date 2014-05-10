var passport = require('passport');
var ProjectRouter = require('project-router-mongoose');
var Checklist = require('app/models/checklist');
var User = require('app/models/user');

module.exports = function (app) {

  app.get('/auth/github', passport.authenticate('github'), function(){});
  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
    res.redirect('/');
  });

  var router = ProjectRouter.map(function () {
    this.namespace('api', function () {
      this.resource('users', {only: ['show'], resource: User}, function () {
        this.resource('checklists', {only: ['index', 'create'], resource: Checklist });
      });

      this.resource('checklists', {only: ['show', 'update'], resource: Checklist}, function () {
        this.member.put('/reorder');
        this.resource('list-items', {only: ['update', 'create', 'destroy'] });
      });

      this.resource('sessions', {only: 'destroy'});
    });


    this.get('/', 'index');
    this.get('/:id', 'index');
    this.get('/:username/:checklistSlug', 'index');
  });

  app.use(router);

};
