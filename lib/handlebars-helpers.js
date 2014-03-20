function objectToAttributes (object) {
  var ret = [];
  for (var key in object) {
    ret.push(key+'='+'"'+object[key]+'"');
  }
  return ret.join(' ');
}

function makeTag (type, attrs) {
  var ret;
  attrs = objectToAttributes(attrs);
  ret = '<'+type+' '+attrs+'>';
  if ('link' !== type) ret+='</'+type+'>';
  return ret;
}

exports.asset = function (value) {
  var type, attrs;
  value = '/'+value;
  if (value.match(/.js$/)) {
    type = 'script';
    attrs = {src: value};
  }

  if (value.match(/.css$/)) {
    type = 'link';
    attrs = {href: value, rel: 'stylesheet'};
  }

  return makeTag(type, attrs);
};
