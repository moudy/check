var supertest = require('supertest');
var Checklist = require('app/models/checklist');
var app = require('../../../../../app');

describe('PUT /api/checklist/:checklistId/list-item/:id', function () {
  beforeEach(resetDB);
  beforeEach(createModel(Checklist, fixtures('checklist'), 'checklist'));

  it('updates', function (done) {
    var listItem = this.checklist.listItems[0];
    var ENDPOINT = '/api/checklists/'+this.checklist.id+'/list-items/'+listItem.id;
    var newData = {description: 'My new descritption'};

    supertest(app).put(ENDPOINT).set('Accept', 'application/json').send({listItem: newData}).end(function (err, res) {
      var listItem = res.body.listItem;
      expect(listItem.description).to.eq(newData.description);
      done();
    });
  });

});
