App.ChecklistsNewRoute = Em.Route.extend({
  renderTemplate: function (controller) {
    this._super.apply(this, arguments);
    Em.run.scheduleOnce('afterRender', controller, function () {
      this.set('isEditingTitle', true);
    });
  }

});
