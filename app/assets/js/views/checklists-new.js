App.ChecklistsNewView = Em.View.extend({
  classNames: 'content-width checklists-show'

, classNameBindings: [
  , 'controller.canEdit'
  , 'controller.isLoading'
  ]

});
