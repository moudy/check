var App = require('../app').instance;

App.ChecklistsShowRoute = Em.Route.extend({
  model: function (params) {
    return this.store.find('checklist', params.checklistSlug);
  }

, setupController: function (controller, context) {
    this._super(controller, context);
    controller.set('isEditing', false);
  }

, serialize: function (model) {
    return {checklistSlug: model.get('id')};
  }
});
