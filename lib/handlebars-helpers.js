
exports['asset-url'] = function (name) {
  if (this.ENV.production) name = this.assets.url(name);
  if (this.settings.ASSET_HOST) name = this.settings.ASSET_HOST+name;
  return name;
};
