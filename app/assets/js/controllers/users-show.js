App.UsersShowController = Em.ObjectController.extend({

  isCurrentUserProfile: function () {
    return this.session.isCurrentUser(this.get('id'));
  }.property('userId')

});
