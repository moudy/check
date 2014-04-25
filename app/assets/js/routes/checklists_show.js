App.ChecklistsShowRoute = Em.Route.extend({
  model: function (params) {
    return this.store.find('checklist', params.id);
  }

, afterModel: function (model) {
    document.title = [model.get('title'), model.get('username')].join(' | ');
  }

, serialize: function(model) {
    return model.getProperties('username', 'id');
  }

});
