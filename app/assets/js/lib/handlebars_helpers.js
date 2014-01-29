var markdown = require('./markdown');

exports.register = function (Handlebars) {
  Handlebars.helper('markdown', function(value) {
    if (!value) return '';
    return new Handlebars.SafeString(markdown(value));
  });
};
