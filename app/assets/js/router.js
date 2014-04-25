App.Router.reopen({ location: 'auto' });

App.Router.map(function () {
  this.route('index', {path: '/'});
  this.route('users.show', {path: '/:username'});
  this.route('checklists.show', {path: '/:username/:id'});

  this.route('checklists.new', {path: '/list/new'});

  this.route('signout');
});


