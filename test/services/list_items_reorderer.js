/* globals describe: false, it: false, beforeEach: false, after: false */
var expect = require('chai').expect;

var mongoose = require('mongoose');
var Checklist = require('../../app/models/checklist');
var ListItemsReorderer = require('../../app/services/list_items_reorderer');


describe('ListItemsReorderer', function () {
  var checklist;
  var listDescriptionArray = ['a', 'b', 'c'];
  var listIds;

  beforeEach(function () {
    checklist = new Checklist({ title: 'Foo' });
    for (var i=0; i < listDescriptionArray.length; i++) {
      checklist.listItems.push({description: listDescriptionArray[i], index: i});
    }

    listIds = checklist.listItems.map(function (li) { return li.id; });
  });

  it('orders based on array of ids', function () {
    ListItemsReorderer.reorder(checklist, listIds.slice(0).reverse());
    var expected = {a:2, b:1, c:0};
    checklist.listItems.forEach(function (li) {
      expect(li.index).to.eql(expected[li.description]);
    });
  });

  it('cleans up index order after deletion', function () {
    checklist.listItems.shift();
    ListItemsReorderer.reorder(checklist);
    var expected = {b:0, c:1};
    checklist.listItems.forEach(function (li) {
      expect(li.index).to.eql(expected[li.description]);
    });
  });

  after(function () {
    mongoose.models = {};
    mongoose.modelSchemas = {};
  });

});
