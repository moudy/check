var handlebars = require('handlebars');

exports['asset-url'] = function (name) {
  //if (this.ENV.production) name = this.assets.url(name);
  if (this.settings.ASSET_ORIGIN) name = this.settings.ASSET_ORIGIN+name;
  return name;
};

exports['to-json'] = function (data, replacer, spacer) {
  return new handlebars.SafeString(JSON.stringify(data, replacer, spacer));
};
