var Authorization = module.exports = function (user) {
  this.user = user;
};

var p = Authorization.prototype;

p.editChecklist = function (checklist) {
  if (!this.user) return false;
  return checklist.userId === this.user.id;
};



