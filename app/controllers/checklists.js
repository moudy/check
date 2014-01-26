var Checklist = require('../models/checklist');

exports.index = function (req, res) {
  Checklist.update({}, { userId:"52e56ce339e7f71100c5e5b8"},  { multi: true }, function () {});
  var userId = req.user.id;
  Checklist.find({userId:userId}, function (error, checklists) {
    res.json({
      checklists: checklists
    });
  });
};

exports.create = function (req, res) {
  var attrs = req.body.checklist;
  delete attrs.listItems;
  var userId = req.user.id;
  attrs.useId = userId;
  Checklist.create(attrs, function (error, checklist) {
    res.json({
      checklist: checklist
    });
  });
};

exports.update = function (req, res) {
  var id  = req.params.id;
  var userId = req.user.id;
  var attrs = req.body.checklist;
  delete attrs.listItems;

  Checklist.findOneAndUpdate({_id:id, userId:userId}, attrs, function (error, checklist) {
    res.json({ checklist: checklist });
  });
};

exports.show = function (req, res) {
  var userId = req.user.id;
  Checklist.findOne({_id:req.params.checklistSlug, userId:userId}, function (error, checklist) {
    res.format({
      'text/html': function() { res.render('index'); }
    , 'application/json': function () { res.send({checklist: checklist}); }
    });
  });
};

exports.del = function (req, res) {
  var userId = req.user.id;
  Checklist.findOneAndRemove({_id:req.params.id, userId:userId}, function () {
    res.format({
      'text/html': function() { res.render('index'); }
    , 'application/json': function () { res.send({checklist: null}); }
    });
  });
};
