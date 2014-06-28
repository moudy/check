import Ember from 'ember';
import AutofocusableMixin from 'client/mixins/autofocusable';

module('AutofocusableMixin');

// Replace this with your real tests.
test('it works', function() {
  var AutofocusableObject = Ember.Object.extend(AutofocusableMixin);
  var subject = AutofocusableObject.create();
  ok(subject);
});
