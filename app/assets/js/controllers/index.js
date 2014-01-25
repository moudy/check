require('./checklist_items');
require('./checklist_item');
require('./checklists_show');

var App = require('../app').instance;

App.IndexController = Em.ArrayController.extend({

  sortProperties: ['title']
, sortAscending: true

});
