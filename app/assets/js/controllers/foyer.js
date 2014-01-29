var App = require('../app').instance;

var listItems = [
  {description: '## Read the Checklist Manifesto', isCompleted:true}
, {description: '## Create an Account', isActive:true}
, {description: '## Make your first list'}
, {description: '## Share your list with others'}
, {description: '## Adapt someone else\'s list'}
];

App.FoyerController = Em.Controller.extend({
  listItems: listItems

});

