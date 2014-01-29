var markdown = require('./markdown');

exports.register = function (Handlebars) {
  Handlebars.helper('markdown', function(value) {
    return new Handlebars.SafeString(markdown(value));
  });
};
