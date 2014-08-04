var Checklist = require('app/models/checklist');
var routeHelpers = require('../../helpers');
var get = routeHelpers.get;

describe('GET /api/checklists/:id', function () {

  before(resetDB);
  before(createModel(Checklist, fixtures('checklist'), 'checklist'));
  before(expectCount(Checklist, 1));

  it('gets a checklist by id', function () {
    var checklist = this.checklist;
    return get('/api/checklists/'+checklist.id).then(function (res) {
      expect(res.body.checklist.id).to.equal(checklist.id);
    });
  });

  it('gets a checklist by slug', function () {
    var checklist = this.checklist;
    return get('/api/checklists/'+checklist.slug).then(function (res) {
      expect(res.body.checklist.id).to.equal(checklist.id);
    });
  });

});
