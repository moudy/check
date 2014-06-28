import Ember from 'ember';

import Autofocusable from '../mixins/autofocusable';
import EditableField from '../mixins/editable-field';

export default Ember.TextField.extend(Autofocusable, EditableField, {
});
