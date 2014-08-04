var RSVP         = require('rsvp');
var User         = require('app/models/user');
var Checklist    = require('app/models/checklist');
var routeHelpers = require('../../../helpers');
var del          = routeHelpers.del;
var signIn       = routeHelpers.signIn;
var signOut      = routeHelpers.signOut;

describe('DELETE /api/checklist/:checklistId/list-item/:id', function () {

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

    it('updates', function () {
      var checklistId = this.checklist.id;
      var listItemId = this.checklist.listItems[0].id;
      return del(
        '/api/checklists/'+checklistId+'/list-items/'+listItemId
      ).then(function (res) {
        var findById = RSVP.denodeify(Checklist.findById.bind(Checklist));
        return findById(checklistId).then(function (doc) {
            var listItemsIds = doc.listItems.map(function (li) { return li.id; });
            expect(listItemsIds).to.not.include.members([listItemId]);
          });
        });
    });
  });

  context('Signed-out', function () {
    before(signOut);

    it('rejects', function () {
      var checklistId = this.checklist.id;
      var listItemId = this.checklist.listItems[0].id;
      return del(
        '/api/checklists/'+checklistId+'/list-items/'+listItemId
      ).then(function (res) {
        expect(res.status).to.equal(401);
      });
    });

  });

  context('Viewer', function () {
    before(signIn.bind(null, viewer));

    it('rejects', function () {
      var checklistId = this.checklist.id;
      var listItemId = this.checklist.listItems[0].id;
      return del(
        '/api/checklists/'+checklistId+'/list-items/'+listItemId
      ).then(function (res) {
        expect(res.status).to.equal(400);
      });
    });

  });

});
