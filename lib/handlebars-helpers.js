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
  var assetHost = this.settings.ASSET_HOST;
  var assetUrl = assetHost+'/'+value;
  var type, attrs;
  if (value.match(/.js$/)) {
    type = 'script';
    attrs = {src: assetUrl};
  }

  if (value.match(/.css$/)) {
    type = 'link';
    attrs = {href: assetUrl, rel: 'stylesheet'};
  }

  return makeTag(type, attrs);
};
