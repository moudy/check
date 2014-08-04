var User = require('app/models/user');
var Checklist = require('app/models/checklist');
var routeHelpers = require('../../../helpers');
var get = routeHelpers.get;

describe('GET /api/users/:id/checklists', function () {

  var user = new User(fixtures('user'));
  var checklistsData = [
    fixtures('checklist', {userId: user.id})
  , fixtures('checklist', {userId: user.id})
  , fixtures('checklist')
  ];

  before(resetDB);
  before(createModel(Checklist, checklistsData, 'checklists'));
  before(expectCount(Checklist, 3));

  it('returns a users checklists', function () {
    var checklists = this.checklists;
    return get('/api/users/'+user.id+'/checklists').then(function (body) {
      expect(body.checklists.length).to.eq(checklistsData.length - 1);
    });
  });

});
