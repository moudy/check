var util = require('util');
var mongoose = require('mongoose');

module.exports = function findByWhatever (schema, options) {
  function check (value, test) {
    if ('function' === typeof test) return test.call(null, value);
    if (util.isRegExp(test)) return test.test(value);
    if ('*' === test) return true;
    if ('ObjectId' === test) return mongoose.Schema.ObjectId.isValid(value);
  }

  function finder (type) {
    return function () {
      var args = Array.prototype.slice.call(arguments);
      var whatever = args.shift();
      var test, attr, criteria = {};
      for (var i = 0, len = options.length; i < len; i++){
        test = options[i];
        attr = Object.keys(test)[0];
        if (check(whatever, test[attr])) {
          criteria[attr] = test[attr];
          args.unshift(criteria);
          return this[type].apply(this, args);
        }
      }
    };
  }

  schema.findOneByWhatever = finder('findOne');
  schema.findByWhatever = finder('find');
};
