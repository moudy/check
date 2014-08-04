import Ember from 'ember';

var EXAMPLE_LIST_ITEMS = [
  { index: 0, description: 'Hello world of checklists _Edit me_' }
, { index: 1, description: '### There\`s markdown!\n```\nvar foo = "bar"\n```' }
];

export default Ember.Route.extend({

  afterModel: function () {
    document.title = ['Check'].join(' | ');
  }

, setupController: function (controller) {
    controller.setProperties({
      listItems: EXAMPLE_LIST_ITEMS
    , canEdit: true
    });
  }

, renderTemplate: function () {
    var user = this.session.get('user');
    if (!user) return this._super.apply(this, arguments);

    var controller = this.controllerFor('users/show');
    controller.set('model', user);
    this.render('users/show', {controller: controller});
  }

});

