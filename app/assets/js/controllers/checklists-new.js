App.ChecklistsNewController = Em.Controller.extend({
  createRecord: function () {
    var currentUser = this.session.get('user');

    var attrs = {
      userId: currentUser.get('id')
      , username: currentUser.get('username')
      , title: this.get('title')
    };

    return this.store.createRecord('checklist', attrs);
  }

, onSuccess: function (checklist) {
    this.set('isLoading', false);
    var checklists = this.session.get('user.checklists');
    checklists.pushObject(checklist);
    this.transitionToRoute('checklists.show', checklist);
  }

, onError: function (res) {
    console.log('Error', res);
  }

, actions: {
    create: function () {
      this.set('isLoading', true);
      this.createRecord().save().then(this.onSuccess.bind(this), this.onError.bind(this));
    }
  }
});

