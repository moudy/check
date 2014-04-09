var markdown = require('./markdown');
var autolink = require('./autolink');

exports.register = function (Handlebars) {
  Handlebars.helper('markdown', function(value) {
    if (!value) return '';
    return new Handlebars.SafeString(markdown(value));
  });

  Handlebars.helper('autolink', function(value, object) {
    if (!value) return '';
    return new Handlebars.SafeString(autolink(value, object.hash));
  });
};
