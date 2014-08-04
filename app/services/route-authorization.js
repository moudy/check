exports.user = function () {
  return function () {
    if (!this.request.user) this.reject(401);
  };
};
