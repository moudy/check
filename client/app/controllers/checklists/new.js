import Ember from 'ember';

export default Ember.Controller.extend({

  canEdit: true

, showDescription: true

, userBinding: 'session.user'

, createRecord: function () {
    var attrs = this.getProperties('title', 'description');
    attrs.userId = this.get('user.id');
    return this.store.createRecord('checklist', attrs);
  }

, onSuccess: function (checklist) {
    var self = this;
    this.set('isLoading', false);
    this.get('user.checklists').then(function (checklists) {
      checklists.pushObject(checklist);
      self.setProperties({title: null, description: null});
      self.transitionToRoute('checklist', checklist);
    });
  }

, validModel: function () {
    return !!this.get('title');
  }.property('title')

, onError: function (res) {
    console.log('Error', res);
  }

, actions: {

    titleDidFocusOut: function () {}

  , descriptionDidFocusOut: function () {}

  , editTitle: function () {
      this.set('isEditingTitle', true);
    }

  , create: function () {
      if (this.get('title')) {
        this.set('isLoading', true);
        this.createRecord().save().then(this.onSuccess.bind(this), this.onError.bind(this));
      }
    }

  }
});

