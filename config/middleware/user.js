module.exports = function (req, res, next) {
  res.locals.currentUser = JSON.stringify(req.user);
  next();
};
