var env = {};
env[process.env.NODE_ENV] = true;

var mergeTrees = require('broccoli-merge-trees');

var emberTemplateCompiler = require('ember-template-compiler');
var templateBuilder = require('broccoli-template-builder');

var uglifyJS = require('broccoli-uglify-js');
var browserify = require('broccoli-browserify');
var sass = require('broccoli-sass');
var cleanCSS = require('broccoli-clean-css');

var js = 'app/assets/js';
var css = 'app/assets/css';
var templates = 'app/assets/js/templates';

var APP_CSS = 'app.css';
var APP_JS = 'app.js';
var HAED_JS = 'head.js';
var TEMPLATES = 'templates.js';

templates = templateBuilder(templates, {
  extensions: ['hbs']
, outputFile: TEMPLATES
, namespace: 'Ember.TEMPLATES'
, compile: function (string) {
    return 'Ember.Handlebars.template('+emberTemplateCompiler.precompile(string)+')';
  }
});

var headJS = browserify(js, {
  entries: ['./head.js']
, outputFile: HAED_JS
, bundle: {debug: !env.production}
});

var assetSuffix = env.production ? 'prod' : 'dev';

var appJS = browserify(js, {
  entries: ['./app.'+assetSuffix+'.js']
, outputFile: APP_JS
, bundle: {debug: !env.production}
});

var appCSS = sass([css], 'app.scss', APP_CSS);

if (env.production) {
  appCSS = cleanCSS(appCSS);
  headJS = uglifyJS(headJS);
  appJS = uglifyJS(appJS);
  templates = uglifyJS(templates);
}

module.exports = mergeTrees([
  headJS
, appJS
, appCSS
, templates
], { overwrite: true });
