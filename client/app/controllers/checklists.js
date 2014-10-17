
import Ember from 'ember';

export default Ember.ObjectController.extend({

  checklistsTitle: function () {
    return this.get('firstName')+"'s Checklists";
  }.property('firstName')

});
