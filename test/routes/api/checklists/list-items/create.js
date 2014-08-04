var RSVP         = require('rsvp');
var User         = require('app/models/user');
var Checklist    = require('app/models/checklist');
var routeHelpers = require('../../../helpers');
var post         = routeHelpers.post;
var signIn       = routeHelpers.signIn;
var signOut      = routeHelpers.signOut;

describe('POST /api/checklist/:id/list-item', function () {

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

    it('creates a list item', function () {
      var newListItem = {description: 'A new list item'};
      return post(
        '/api/checklists/'+this.checklist.id+'/list-items'
      , {listItem: newListItem}
      ).then(function (res) {
        var listItem = res.body.listItem;
        expect(listItem.description).to.equal(newListItem.description);
      });

    });
  });

  context('Signed-out', function () {
    before(signOut);

    it('rejects', function () {
      var newListItem = {description: 'A new list item'};
      return post(
        '/api/checklists/'+this.checklist.id+'/list-items'
      , {listItem: newListItem}
      ).then(function (res) {
        expect(res.status).to.equal(401);
      });
    });

  });

  context('Viewer', function () {
    before(signIn.bind(null, viewer));

    it('rejects', function () {
      var newListItem = {description: 'A new list item'};
      return post(
        '/api/checklists/'+this.checklist.id+'/list-items'
      , {listItem: newListItem}
      ).then(function (res) {
        expect(res.status).to.equal(400);
      });
    });

  });

});
