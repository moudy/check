import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['index']

, setCurrentUser: function (user) {
    this.session.set('user', user);
  }

, actions: {
    signout: function () {

      Ember.$.ajax({
        type: 'post'
      , url:'/api/sessions/'+this.session.get('user.id')
      , data: { _method: 'DELETE' }
      , dataType: 'json'
      });

      this.session.set('user', null);
      this.transitionToRoute('index');
    }
  }

});

