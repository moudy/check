var User         = require('app/models/user');
var Checklist    = require('app/models/checklist');
var routeHelpers = require('../../../helpers');

var post    = routeHelpers.post;
var signIn  = routeHelpers.signIn;
var signOut = routeHelpers.signOut;

describe('POST /api/users/:userId/checklists', function () {

  var user = new User(fixtures('user'));

  before(signIn.bind(null, user));
  before(resetDB);
  before(expectCount(Checklist, 0));

  after(expectCount(Checklist, 1));
  after(signOut);

  it('creates a checklist for user', function () {
    var checklistData = fixtures('checklist');

    return post(
      '/api/users/'+user.id+'/checklists'
    , {checklist: checklistData}
    ).then(function (body) {
      expect(body.checklist.userId).to.equal(user.id);
    });
  });

});
