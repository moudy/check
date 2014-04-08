module.exports = function () {
  var isProductionEnv = process.env.NODE_ENV === 'production';

  var mergeTrees = require('broccoli-merge-trees');

  var emberTemplateCompiler = require('ember-template-compiler');
  var templateBuilder = require('broccoli-template-builder');

  var uglifyJS = require('broccoli-uglify-js');
  var browserify = require('broccoli-browserify');
  var sass = require('broccoli-sass');
  var cleanCSS = require('broccoli-clean-css');

  var js = 'app/assets/js';
  var css = 'app/assets/css';
  var templates = 'app/templates';

  templates = templateBuilder(templates, {
    extensions: ['hbs']
  , outputFile: 'templates.js'
  , namespace: 'Ember.TEMPLATES'
  , compile: function (string) {
      return 'Ember.Handlebars.template('+emberTemplateCompiler.precompile(string)+')';
    }
  });

  var headJS = browserify(js, {
    entries: ['./head.js']
  , outputFile: 'head.js'
  , bundle: {debug: !isProductionEnv}
  });

  var appJS = browserify(js, {
    entries: ['./app.js']
  , outputFile: 'app.js'
  , bundle: {debug: !isProductionEnv}
  });

  var appCSS = sass([css], 'app.scss', 'app.css');

  if (isProductionEnv) {
    appCSS = cleanCSS(appCSS);
    headJS = uglifyJS(headJS);
    appJS = uglifyJS(appJS);
    templates = uglifyJS(templates);
  }

  return mergeTrees([
      headJS
    , appJS
    , appCSS
    , templates
    ], { overwrite: true });
};
