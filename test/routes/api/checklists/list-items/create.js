var Checklist = require('app/models/checklist');
var supertest = require('supertest');
var app = require('../../../../../app').app;

describe('POST /api/checklist/:id/list-item', function () {

  beforeEach(resetDB);
  beforeEach(createModel(Checklist, fixtures('checklist', {listItems: []}), 'checklist'));

  it('creates a list item', function (done) {
    var newListItem = {description: 'A new list item'};
    var ENDPOINT = '/api/checklists/'+this.checklist.id+'/list-items';
    supertest(app).post(ENDPOINT).set('Accept', 'application/json').send({listItem: newListItem}).end(function (err, res) {
      var listItem = res.body.listItem;
      expect(listItem.description).to.eq(newListItem.description);
      done();
    });

  });

});
