App.Session = Em.Controller.extend({
  isCurrentUser: function (userId) {
    if (userId && 'string' !== typeof userId) userId = userId.get('id');
    return userId && this.get('user.id') === userId;
  }
});
