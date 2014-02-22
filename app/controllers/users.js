//var UserCreator = require('../service/user_creator');
var User = require('../models/user');
var Checklist = require('../models/checklist');

function errorsSerializer (error) {
  var errors = error.errors;
  for (var e in errors) {
    errors[e] = errors[e].message;
  }
  return {errors: errors};
}

exports.show = function (req, res) {
  User.findOneByWhatever(req.params.id, function (err, user) {
    res.format({
      'text/html': function() { res.render('index'); }
    , 'application/json': function () { res.send({user: user}); }
    });
  });
};

exports.create = function (req, res) {
  User.register(req.body.user, req.body.user.password, function(err, user) {
    req.logIn(user, function(err_) {
      if (err) res.json(400, errorsSerializer(err));
      res.json({user: user});
    });
  });
};

exports.update = function (req, res) {
  User.findByIdAndUpdate(req.params.id, req.body.user, function (err, user) {
    res.json({user: user});
  });
};

exports.checklistsIndex = function (req, res) {
  Checklist.find({userId: req.params.id}, function (err, docs) {
    res.json({checklists: docs});
  });
};
