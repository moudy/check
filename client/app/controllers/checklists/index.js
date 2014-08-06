import Ember from 'ember';

export default Ember.ArrayController.extend({

  needs: ['user/index']

, queryParams: ['sort']

, sort: null

, desc: null

, page: 1

, showLoadMore: function () {
    return this.get('count') > this.get('length');
  }.property('length', 'count')

, userBinding: 'controllers.user/index.model'

, sortBinding: 'controllers.user/index.sort'

, countBinding: 'controllers.user/index.checklistsTotal'

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
