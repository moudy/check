var Checklist = require('app/models/checklist');
var routeHelpers = require('../../helpers');
var put = routeHelpers.put;

describe('PUT /api/checklist/:id/reorder', function () {
  beforeEach(resetDB);
  beforeEach(createModel(Checklist, fixtures('checklist'), 'checklist'));

  it('reorders', function () {
    var listItems = this.checklist.listItems;
    var listItemsIds = listItems.map(function (li) { return li.id; });
    var newListItemsIds = listItemsIds.slice().reverse();

    function testOrder (res) {
      var responseListItems = res.body.checklist.listItems;
      newListItemsIds.forEach(function (id) {
        var li = _.find(responseListItems, function (l) {return l.id === id;});
        expect(li.index).to.equal(newListItemsIds.indexOf(id));
      });
    }

    return put(
      '/api/checklists/'+this.checklist.id+'/reorder'
    , {listItemsIds: newListItemsIds}
    ).then(testOrder);
  });

});

