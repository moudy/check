require('./application');
require('./foyer');
require('./sign_up');
require('./checklist_list_items');
require('./checklist_list_item');
require('./checklists_show');

var App = require('../app').instance;

App.IndexController = Em.ArrayController.extend({
  needs: 'application'
, sortProperties: ['title']
, sortAscending: true

});
