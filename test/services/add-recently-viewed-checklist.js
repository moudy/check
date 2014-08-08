var User = require('app/models/user');
var Checklist = require('app/models/checklist');
var AddRecentlyViewedChecklist = require('app/services/add-recently-viewed-checklist');
var RECENTLY_VIEWED_MAX = AddRecentlyViewedChecklist.RECENTLY_VIEWED_MAX;

describe('AddRecentlyViewedChecklist', function () {


  context('first', function () {
    var user = new User(fixtures('user', {recentlyViewed: null}));
    var checklist = new Checklist();

    before(resetDB);
    before(function () {
      return AddRecentlyViewedChecklist.add(user, checklist.id);
    });

    it('adds 1', function () {
      expect(user.recentlyViewed.length).to.equal(1);
      expect(user.recentlyViewed[0]).to.equal(checklist.id);
    });
  });

  context('second', function () {
    var user = new User(fixtures('user', {recentlyViewed: ['53e4c5a19b989800c3349f69']}));
    var checklist = new Checklist();

    before(resetDB);
    before(function () {
      return AddRecentlyViewedChecklist.add(user, checklist.id);
    });

    it('adds another 1', function () {
      expect(user.recentlyViewed.length).to.equal(2);
      expect(user.recentlyViewed[0]).to.equal(checklist.id);
    });
  });

  context('max', function () {
    var user = new User(fixtures('user', {recentlyViewed: [
      '53e4c5a19b989800c3349f69'
    , '53e4c5a19b989800c3359f69'
    , '53e4c5a19b989800c3359f66'
    , '53e4c9a19b989800c3359f62'
    , '53e4c7a19b989800c3359f69'
    ]}));
    var checklist = new Checklist();

    before(resetDB);
    before(function () {
      return AddRecentlyViewedChecklist.add(user, checklist.id);
    });

    it('it saves the max', function () {
      expect(user.recentlyViewed.length).to.equal(RECENTLY_VIEWED_MAX);
      expect(user.recentlyViewed[0]).to.equal(checklist.id);
    });
  });

});
