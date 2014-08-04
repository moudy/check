var User = require('app/models/user');
var routeHelpers = require('../../helpers');
var get = routeHelpers.get;

describe('GET /api/users/:id', function () {

  before(resetDB);
  before(createModel(User, fixtures('user'), 'user'));
  before(expectCount(User, 1));

  it('gets a user by id', function () {
    var user = this.user;
    return get('/api/users/'+user.id).then(function (body) {
      expect(body.user.id).to.equal(user.id);
    });
  });

  it('gets a user by username', function () {
    var user = this.user;
    return get('/api/users/'+user.username).then(function (body) {
      expect(body.user.id).to.equal(user.id);
    });
  });

});

