var App = require('../app').instance;

var listItems = [
  {title:'Read the Checklist Manifesto', isCompleted:true}
, {title:'Create an Account', isActive:true}
, {title:'Make your first list'}
, {title:'Share your list with others'}
, {title:'Adapt someone else\'s list to fit your needs'}
];

App.FoyerController = Em.Controller.extend({
  listItems: listItems

});

