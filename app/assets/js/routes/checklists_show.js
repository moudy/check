App.ChecklistsShowRoute = Em.Route.extend({
  model: function (params) {
    return this.store.find('checklist', params.id);
  }

, serialize: function(model) {
    return model.getProperties('username', 'id');
  }

});
