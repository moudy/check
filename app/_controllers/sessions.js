
exports.create = function (req, res) {
  res.json({user: req.user});
};

exports.del = function (req, res) {
  req.logout();
  res.json(200);
};
