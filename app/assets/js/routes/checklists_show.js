App.ChecklistsShowRoute = Em.Route.extend({
  model: function (params) {
    return this.store.find('checklist', params.id);
  }

, afterModel: function (model) {
    var user = this.session.get('user');
    document.title = [model.get('title'), user.get('username')].join(' | ');
  }

, serialize: function(model) {
    return model.getProperties('username', 'id');
  }

});
