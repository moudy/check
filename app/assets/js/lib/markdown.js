var marked = require('marked');
marked.setOptions({
  highlight: function (code) { return require('highlight.js').highlightAuto(code).value; }
, smartLists: true
, smartypants: true
});

module.exports = marked;
