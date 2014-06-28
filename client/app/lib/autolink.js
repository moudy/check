// Adpated form https://github.com/bryanwoods/autolink-js/blob/master/autolink.js

var autoLink, __slice = [].slice;

autoLink = function() {
  var linkAttributes, option, options, pattern, v;
  options = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  pattern = /(^|\s)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
  if (!options.length) {
    return this.replace(pattern, "$1<a href='$2'>$2</a>");
  }
  option = options[0];
  linkAttributes = ((function() {
    var _results;
    _results = [];
    for (var k in option) {
      v = option[k];
      if (k !== 'callback') {
        _results.push(" " + k + "='" + v + "'");
      }
    }
    return _results;
  })()).join('');
  return this.replace(pattern, function(match, space, url) {
    var link;
    link = (typeof option.callback === "function" ? option.callback(url) : void 0) || ("<a href='" + url + "'" + linkAttributes + ">" + url + "</a>");
    return "" + space + link;
  });
};


export default function () {
  var args = __slice.call(arguments, 0);
  var string = args.shift();
  return autoLink.apply(string, args);
}

