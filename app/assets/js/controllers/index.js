require('./application');
require('./foyer');
require('./checklist_list_items');
require('./checklist_list_item');
require('./checklists_show');

var App = require('../app').instance;

App.IndexController = Em.ArrayController.extend({

  sortProperties: ['title']
, sortAscending: true

});
