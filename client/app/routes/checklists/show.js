import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    return this.store.find('checklist', params.slug);
  }

, afterModel: function (model) {
    document.title = [model.get('title'), model.get('username')].join(' | ');
  }

, serialize: function(model) {
    return model.getProperties('username', 'slug');
  }

, actions: {

    delete_: function () {
      if (!window.confirm('Are you sure?')) return;
      var self = this;
      var model = this.get('controller.model');

      model.destroyRecord().then(function() {
        var checklists = self.session.get('user.checklists');
        checklists.removeObject(model);
        Ember.run.next(null, function() {
          self.transitionTo('users.show', self.session.get('user'));
        });
      });
    }
  }

});
