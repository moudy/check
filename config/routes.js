var requireDirectory = require('node-require-directory');
var controllers = requireDirectory('app/controllers');
var passport = require('passport');

exports.configure = function (app) {

  app.get('/', controllers.pages.index);

  app.get('/checklists', controllers.checklists.index);

  app.get('/checklists/:checklistSlug', controllers.checklists.show);

  app.post('/checklists', controllers.checklists.create);
  app.put('/checklists/:id', controllers.checklists.update);
  app.put('/checklists/:id/reorder', controllers.checklists.updateReorder);
  app.delete('/checklists/:id', controllers.checklists.del);

  app.post('/checklists/:checklistId/list-items', controllers.list_items.create);
  app.put('/checklists/:checklistId/list-items/:id', controllers.list_items.update);
  app.delete('/checklists/:checklistId/list-items/:id', controllers.list_items.del);

  app.get('/users/:id', controllers.users.show);
  app.post('/users', controllers.users.create);
  app.put('/users/:id', controllers.users.update);
  app.get('/users/:id/checklists', controllers.users.checklistsIndex);

  app.post('/sessions', passport.authenticate('local'), controllers.sessions.create);
  app.delete('/sessions', controllers.sessions.del);

  app.get('/auth/github', passport.authenticate('github'), function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

  // GET /auth/github/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
    res.redirect('/');
  });

  app.get('/:id', controllers.users.show);
  app.get('/:username/:checklistSlug', controllers.checklists.show);
};
