var App = require('../app').instance;

App.ChecklistsNewRoute = Em.Route.extend({
  model: function () {
    return this.store.createRecord('checklist');
  }

, renderTemplate: function (_, model) {
    var controller = this.controllerFor('checklistsShow');

    controller.setProperties({
      model:model
    , isEditing: true
    });

    this.render('checklists/show', {
      controller: controller
    });
  }
});
