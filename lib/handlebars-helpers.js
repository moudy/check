var handlebars = require('handlebars');

function getFingerprintedFilename (path, assets) {
  var urlParts = path.split('/');
  var name = urlParts.pop();

  var nameParts = name.split('.');
  var extname = nameParts.pop()+'.gz';
  var basename = nameParts.join('.');

  var regex = new RegExp(basename+'.+'+extname);

  name = assets.filter(function (a) { return a.match(regex); })[0];
  return [urlParts.join('/'), name].join('/');
}

exports['asset-url'] = function (path) {
  if ('production' === this.settings.environment) {
    path = getFingerprintedFilename(path, this.settings.ASSETS);
  }

  if (this.settings.assetOrigin) path = this.settings.assetOrigin+path;
  return path;
};

exports['to-json'] = function (data, replacer, spacer) {
  return new handlebars.SafeString(JSON.stringify(data, replacer, spacer));
};
