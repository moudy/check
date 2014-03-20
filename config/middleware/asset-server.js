var broccoli = require('broccoli');
var Watcher =  require('../../node_modules/broccoli/lib/watcher');
var middleware =  require('../../node_modules/broccoli/lib/middleware');

var tree = broccoli.loadBrocfile();
var builder = new broccoli.Builder(tree);
var watcher = new Watcher(builder);

module.exports = middleware(watcher);

