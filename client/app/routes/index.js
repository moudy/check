import Ember from 'ember';

export default Ember.Route.extend({

  afterModel: function () {
    document.title = ['Check'].join(' | ');
  }

, renderTemplate: function () {
    var user = this.session.get('user');
    if (!user) return this._super.apply(this, arguments);

    var controller = this.controllerFor('users/show');
    controller.set('model', user);
    this.render('users/show', {controller: controller});
  }

});

