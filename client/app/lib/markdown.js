var renderer = new marked.Renderer();

renderer.link = function(href, title, text) {
  return '<a target="_blank" href="'+href+'">'+text+'</a>';
};

marked.setOptions({
  highlight: function (code, lang) {
   if (!lang) return hljs.highlightAuto(code).value;
   return hljs.highlight(lang, code).value;
  }
, renderer: renderer
, smartLists: true
, smartypants: true
, tables: true
});

export default marked;

