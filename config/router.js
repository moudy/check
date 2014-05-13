var projectRouter = require('project-router');
var Checklist = require('app/models/checklist');
var User = require('app/models/user');

module.exports = projectRouter.map(function () {
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

