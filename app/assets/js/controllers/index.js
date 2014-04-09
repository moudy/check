require('./application');
require('./header');
require('./foyer');
require('./checklist_list_items');
require('./checklist-list-item');
require('./checklists_index');
require('./checklists_show');
require('./checklists-new');
require('./users-show');

App.IndexController = Em.Controller.extend({
  isCompleted: true
});
