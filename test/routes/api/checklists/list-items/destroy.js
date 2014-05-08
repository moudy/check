var supertest = require('supertest');
var Checklist = require('app/models/checklist');

describe('DELETE /api/checklist/:checklistId/list-item/:id', function () {
  beforeEach(resetDB);
  beforeEach(createModel(Checklist, fixtures('checklist'), 'checklist'));

  it('updates', function (done) {
    var checklistId = this.checklist.id;
    var listItemId = this.checklist.listItems[0].id;
    var ENDPOINT = '/api/checklists/'+checklistId+'/list-items/'+listItemId;

    supertest(app).delete(ENDPOINT).set('Accept', 'application/json').end(function (err, res) {
      Checklist.findById(checklistId, function (err, doc) {
        var listItemsIds = doc.listItems.map(function (li) { return li.id; });
        expect(listItemsIds).to.not.include.members([listItemId]);
        done();
      });
    });
  });

});
