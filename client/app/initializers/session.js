import Session from '../services/session';

export default {
  name: 'session',

  initialize: function(container, app) {
    app.register('session:current', Session, {singleton: true});
    app.inject('controller', 'session', 'session:current');
    app.inject('route', 'session', 'session:current');
  }
};
