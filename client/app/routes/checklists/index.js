import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    var user = this.modelFor('user');
    var query = { userId: user.get('id') };
    if (params.sort) query.sort = params.sort;
    if (params.desc) query.desc = params.desc;
    return this.store.find('checklist', query);
  }

, setupController: function (controller, model) {
    this._super(controller, model.toArray());
  }

, actions: {
    sortChange: function () {
      this.refresh();
    }
  }
});
