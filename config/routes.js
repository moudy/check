var requireDirectory = require('node-require-directory');
var controllers = requireDirectory('app/controllers');

exports.configure = function (app) {
  app.get('/', controllers.pages.index);

  app.get('/checklists', controllers.checklists.index);
  app.post('/checklists', controllers.checklists.create);
  app.put('/checklists/:id', controllers.checklists.update);
  app.post('/listItems', controllers.list_items.create);
  app.put('/listItems/:id', controllers.list_items.update);
  app.delete('/listItems/:id', controllers.list_items.del);
};
