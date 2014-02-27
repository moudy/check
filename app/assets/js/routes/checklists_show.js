App.ChecklistsShowRoute = Em.Route.extend({
  model: function (params) {
    return this.store.find('checklist', params.id);
  }

, setupController: function (controller, context) {
    this._super(controller, context);
    controller.set('isEditing', false);
  }

, serialize: function(model) {
    return model.getProperties('username', 'id');
  }

});
