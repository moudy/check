var requireDirectory = require('node-require-directory');
var controllers = requireDirectory('app/controllers');

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
};
