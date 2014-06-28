import Ember from 'ember';
import SortableMixin from 'client/mixins/sortable';

module('SortableMixin');

// Replace this with your real tests.
test('it works', function() {
  var SortableObject = Ember.Object.extend(SortableMixin);
  var subject = SortableObject.create();
  ok(subject);
});
