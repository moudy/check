var supertest = require('supertest');
var Checklist = require('app/models/checklist');
var User = require('app/models/user');

describe('GET /api/users/:id/checklists', function () {

  var user = new User(fixtures('user'));
  var data = [
    fixtures('checklist', {userId: user.id})
  , fixtures('checklist', {userId: user.id})
  ];

  beforeEach(resetDB);
  beforeEach(createModel(Checklist, data, 'checklists'));
  beforeEach(createModel(Checklist, fixtures('checklist'), 'checklist'));
  beforeEach(expectCount(Checklist, 3));

  it('returns a users checklists', function (done) {
    var ENDPOINT = '/api/users/'+user.id+'/checklists';

    supertest(app).get(ENDPOINT).set('Accept', 'application/json').end(function (err, res) {
      expect(res.body.checklists.length).to.eq(data.length);
      done();
    });
  });
});
