var requireDirectory = require('node-require-directory');
var controllers = requireDirectory('app/controllers');
var passport = require('passport');

exports.configure = function (app) {

  app.get('/', controllers.pages.index);

  app.get('/checklists', controllers.checklists.index);

  app.get('/list/:checklistSlug', controllers.checklists.show);
  app.get('/checklists/:checklistSlug', controllers.checklists.show);

  app.post('/checklists', controllers.checklists.create);
  app.put('/checklists/:id', controllers.checklists.update);
  app.delete('/checklists/:id', controllers.checklists.del);

  app.post('/checklists/:checklistId/list-items', controllers.list_items.create);
  app.put('/checklists/:checklistId/list-items/:id', controllers.list_items.update);
  app.delete('/checklists/:checklistId/list-items/:id', controllers.list_items.del);

  app.get('/:id', controllers.users.show);
  app.get('/users/:id', controllers.users.show);
  app.post('/users', controllers.users.create);
  app.put('/users/:id', controllers.users.update);

  app.post('/sessions', passport.authenticate('local'), controllers.sessions.create);
  app.delete('/sessions', controllers.sessions.del);
};
