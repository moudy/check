import Ember from 'ember';
import EditableFieldMixin from 'client/mixins/editable-field';

module('EditableFieldMixin');

// Replace this with your real tests.
test('it works', function() {
  var EditableFieldObject = Ember.Object.extend(EditableFieldMixin);
  var subject = EditableFieldObject.create();
  ok(subject);
});
