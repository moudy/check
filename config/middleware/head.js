var path = require('path');
var browserify = require('browserify-middleware');
var srcPath = path.join(__dirname, '..', '..', 'app', 'assets', 'js', 'head.js');

module.exports = browserify(srcPath);
