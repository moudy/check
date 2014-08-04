var RSVP         = require('rsvp');
var User         = require('app/models/user');
var Checklist    = require('app/models/checklist');
var routeHelpers = require('../../helpers');
var del          = routeHelpers.del;
var signIn       = routeHelpers.signIn;
var signOut      = routeHelpers.signOut;

describe('DELETE /api/checklist/:id', function () {

  var owner = new User(fixtures('user'));
  var viewer = new User(fixtures('user'));

  before(resetDB);
  before(createModel(
    Checklist
  , fixtures('checklist', {userId: owner.id})
  , 'checklist'
  ));

  context('Owner', function () {
    before(signIn.bind(null, owner));
    before(expectCount(Checklist, 1));
    after(expectCount(Checklist, 0));

    it('destroys', function () {
      var id = this.checklist.id;
      return del(
        '/api/checklists/'+id
      ).then(function (res) {
        expect(res.status).to.equal(200);
      });
    });

  });

  context('Signed-out', function () {
    before(signOut);

    it('rejects', function () {
      var id = this.checklist.id;
      return del(
        '/api/checklists/'+id
      ).then(function (res) {
        expect(res.status).to.equal(400);
      });
    });
  });

  context('Viewer', function () {
    before(signIn.bind(null, viewer));

    it('rejects', function () {
      var id = this.checklist.id;
      return del(
        '/api/checklists/'+id
      ).then(function (res) {
        expect(res.status).to.equal(400);
      });
    });
  });

});
