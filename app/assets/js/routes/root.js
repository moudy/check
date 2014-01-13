var App = require('../app').instance;

App.RootRoute = Em.Route.extend({
  model: function () {
    return this.store.find('checklist');
  }

, setupController: function (controller, context) {
    this._super(controller, context);
    var first = controller.get('firstObject');
    if (!first) {
      first = this.store.createRecord('checklist', {title: 'Untitled'});
    }
    controller.set('checklist', first);
    first.get('listItems').then(function (a) {
      if( a.get('firstObject')) a.set('firstObject.isActive', true);
    });
  }

});
