var User = require('app/models/user');
var Checklist = require('app/models/checklist');

var PER_PAGE = 10;
var DEFAULT_SORT = 'updatedAt';

module.exports = function (userId, options) {
  if (userId instanceof User) userId = userId.id;
  var query = Checklist.find({userId: userId});

  var sort = options.sort || DEFAULT_SORT;
  var desc = !!~sort.indexOf('desc');
  sort = sort.replace(/[-]?desc/, '');
  sort || (sort = DEFAULT_SORT);
  if (desc) sort = '-'+sort;

  var page = options.page || 1;
  query.limit(PER_PAGE);
  query.skip((page - 1) * PER_PAGE);

  query.sort(sort);
  return query.exec();
};

module.exports.PER_PAGE = PER_PAGE;

