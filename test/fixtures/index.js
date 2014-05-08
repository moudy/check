
module.exports = function (name, data) {
  var jsonData = require('./'+name);
  return _.extend({}, jsonData, data);
};
