import Ember from 'ember';

var EXAMPLE_LIST_ITEMS = [
  { index: 0, description: 'Hello world of checklists _Edit me_' }
, { index: 1, description: '### There\`s markdown!\n```\nvar foo = "bar"\n```' }
];

export default Ember.Route.extend({

  isAuthenticated: Ember.computed.bool('session.user')

, model: function () {
    if (this.get('isAuthenticated')) return this.loggedInModel();
    return this.store.find('checklist', { recentlyCreated: true});
  }

, loggedInModel: function () {
    var user = this.session.get('user');
    var userId = user.get('id');

    var query = { userId: userId };
    var recentQuery = { userId: userId, recent: true };

    return Ember.RSVP.hash({
      checklists: this.store.find('checklist', query)
    , recent: this.store.find('checklist', recentQuery)
    });
  }

, afterModel: function () {
    document.title = ['Check'].join(' | ');
  }

, setupController: function (controller, model) {
    if (!this.get('isAuthenticated')) {
      this._super(controller, model);
    }
  }

, renderTemplate: function (controller, model) {
    var user = this.session.get('user');
    if (!user) return this._super.apply(this, arguments);

    controller = this.controllerFor('dashboard');

    controller.setProperties({
      checklists: model.checklists
    , recent: model.recent
    });

    this.render('dashboard', {controller: controller});
  }

});

