module.exports = function (req, res, next) {
  if ('POST' === req.method || 'PUT' === req.method) {
    console.log('Request body', req.body);
  }
  next();
};
