var App = require('../app').instance;

App.ApplicationController = Em.Controller.extend({
  needs: ['index']

, setCurrentUser: function (user) {
    this.store.push('user', user);
    this.set('currentUserId', user.id);
  }

, currentUser: function () {
    var userId = this.get('currentUserId');
    if (userId) {
      return this.store.find('user', userId);
    } else {
      return false;
    }
  }.property('currentUserId')

, signinSuccess: function (data) {
    this.setCurrentUser(data.user);
    this.setProperties({password: null, showSignin: false});

    var router = App.Router.router.getHandler('index');
    router.renderTemplate();
    router.model().then(function (data) {
      this.set('controllers.index.content', data);
    }.bind(this));
  }

, signinFail: function () {
    console.log('fail', arguments);
  }

, actions: {
    showSignin: function () {
      this.toggleProperty('showSignin');
    }
  , showSignup: function () {
      this.transitionToRoute('index');
      // trigger focus/scroll here
    }
  , signin: function () {
      var data = this.getProperties('username', 'password');
      Em.$.post('/sessions', data).then(this.signinSuccess.bind(this), this.signinFail.bind(this));
    }
  , signout: function () {
      this.set('currentUserId', null);
      Em.$.post('/sessions', { _method: 'DELETE' });
      App.Router.router.getHandler('index').renderTemplate();
    }
  }

});

