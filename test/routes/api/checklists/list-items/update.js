var supertest = require('supertest');
var User = require('app/models/user');
var Checklist = require('app/models/checklist');
var routeHelpers = require('../../../helpers');
var put = routeHelpers.put;
var signIn = routeHelpers.signIn;
var signOut = routeHelpers.signOut;

describe('PUT /api/checklist/:checklistId/list-item/:id', function () {
  var owner = new User(fixtures('user'));
  var viewer = new User(fixtures('user'));

  before(resetDB);
  before(createModel(Checklist, fixtures('checklist', {userId: owner.id}), 'checklist'));

  context('Owner', function () {
    before(signIn.bind(null, owner));

    it('updates', function () {
      var listItem = this.checklist.listItems[0];

      var newData = {description: 'My new descritption'};

      return put(
        '/api/checklists/'+this.checklist.id+'/list-items/'+listItem.id
      , {listItem: newData}
      ).then(function (res) {
        var listItem = res.body.listItem;
        expect(listItem.description).to.eq(newData.description);
      });
    });
  });

  context('Signed-out', function () {
    before(signOut);

    it('rejects', function () {
      var listItem = this.checklist.listItems[0];
      var newData = {description: 'My new descritption'};

      return put(
        '/api/checklists/'+this.checklist.id+'/list-items/'+listItem.id
      , {listItem: newData}
      ).then(function (res) {
        expect(res.status).to.equal(401);
      });
    });
  });

  context('Viewer', function () {
    before(signIn.bind(null, viewer));

    it('rejects', function () {
      var listItem = this.checklist.listItems[0];
      var newData = {description: 'My new descritption'};

      return put(
        '/api/checklists/'+this.checklist.id+'/list-items/'+listItem.id
      , {listItem: newData}
      ).then(function (res) {
        expect(res.status).to.equal(400);
      });
    });
  });


});
