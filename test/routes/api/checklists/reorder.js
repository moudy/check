var Checklist = require('app/models/checklist');
var supertest = require('supertest');
var app = require('../../../../app');

describe('POST /api/checklist/:id/reorder', function () {
  beforeEach(resetDB);
  beforeEach(createModel(Checklist, fixtures('checklist'), 'checklist'));

  it('reorders', function (done) {
    var listItems = this.checklist.listItems;
    var listItemsIds = listItems.map(function (li) { return li.id; });
    var newListItemsIds = listItemsIds.slice().reverse();
    var ENDPOINT = '/api/checklists/'+this.checklist.id+'/reorder';

    supertest(app)
      .put(ENDPOINT)
      .set('Accept', 'application/json')
      .send({listItemsIds: newListItemsIds})
      .end(function (err, res) {
        var responseListItems = res.body.checklist.listItems;
        newListItemsIds.forEach(function (id) {
          var li = _.find(responseListItems, function (l) {return l.id === id;});
          expect(li.index).to.equal(newListItemsIds.indexOf(id));
        });
        done();
      });
  });
});

