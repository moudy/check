require('./application');
require('./header');
require('./foyer');
require('./checklist_list_items');
require('./checklist-list-item');
require('./checklists_index');
require('./checklists_show');
require('./checklists-new');
require('./users-show');

var App = require('../app').instance;

App.IndexController = Em.ArrayController.extend({
});
