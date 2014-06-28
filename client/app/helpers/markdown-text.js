import Ember from 'ember';
import markdown from '../lib/markdown';

export default Ember.Handlebars.makeBoundHelper(function(value) {
  if (!value) return '';
  return new Ember.Handlebars.SafeString(markdown(value));
});
