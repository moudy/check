App.SignoutRoute = Em.Route.extend({
  beforeModel: function () {
    this.transitionTo('index');
  }
});
