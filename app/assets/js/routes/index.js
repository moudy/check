var App = require('../app').instance;

App.IndexRoute = Em.Route.extend({
  model: function () {
    return this.store.find('checklist');
  }

, setupController: function (controller, context) {
    this._super(controller, context);
    controller.set('currentChecklist', controller.get('firstObject'));
  }

});

