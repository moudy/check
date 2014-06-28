import Ember from 'ember';
import autolink from '../lib/autolink';

export default Ember.Handlebars.makeBoundHelper(function(value, object) {
  if (!value) return '';
  return new Ember.Handlebars.SafeString(autolink(value, object.hash));
});
