var App = require('../app').instance;

App.ChecklistRoute = Em.Route.extend({
  model: function (params) {
    return this.store.find('checklist', params.checklistSlug);
  }

, serialize: function (model) {
    return {checklistSlug: model.get('id')};
  }
});
