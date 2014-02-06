var marked = require('marked');
var renderer = new marked.Renderer();

renderer.link = function(href, title, text) {
  return '<a target="_blank" href="'+href+'">'+text+'</a>';
};

marked.setOptions({
  highlight: function (code) { return require('highlight.js').highlightAuto(code).value; }
, renderer: renderer
, smartLists: true
, smartypants: true
, tables: true
});

module.exports = marked;
