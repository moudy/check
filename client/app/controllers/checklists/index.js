import Ember from 'ember';

export default Ember.ArrayController.extend({

  page: 1

, showLoadMore: function () {
    return this.get('total') > this.get('length');
  }.property('length', 'total')

, totalBinding: 'user.checklistsCount.total'

, actions: {

    loadMore: function () {
      if (this.get('isLoadingMore')) return;

      this.incrementProperty('page');
      var query = this.getProperties(this.get('queryParams'));
      query.page = this.get('page');
      query.userId = this.get('user.id');

      this.set('isLoadingMore', true);
      this.store.find('checklist', query).then(results => {
        this.pushObjects(results.toArray());
        this.set('isLoadingMore', false);
      });
    }
  }

});

