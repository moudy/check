require('./application');
require('./header');
require('./foyer');
require('./checklist_list_items');
require('./checklist_list_item');
require('./checklists_index');
require('./checklists_show');
require('./users_show');

var App = require('../app').instance;

App.IndexController = Em.ArrayController.extend({
});
