module.exports = function (broccoli) {
  var isProductionEnv = process.env.NODE_ENV === 'production';

  var uglifyJS = require('broccoli-uglify-js');
  var browserify = require('broccoli-browserify');
  var sass = require('broccoli-sass');
  var cleanCSS = require('broccoli-clean-css');

  var js = broccoli.makeTree('app/assets/js');
  var css = broccoli.makeTree('app/assets/css');

  var headJS = browserify(js, {
    entries: ['./head.js']
  , outputFile: 'head.js'
  , bundle: {debug: isProductionEnv}
  });

  var appJS = browserify(js, {
    entries: ['./app.js']
  , outputFile: 'app.js'
  , bundle: {debug: isProductionEnv}
  });

  var appCSS = sass([css], 'app.scss', 'app.css');

  if (!isProductionEnv) {
    appCSS = cleanCSS(appCSS);
    headJS = uglifyJS(headJS);
    appJS = uglifyJS(appJS);
  }

  return [headJS, appJS, appCSS];
};
