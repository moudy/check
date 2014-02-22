var User = require('../models/user');
var Checklist = require('../models/checklist');
var ListItemsReorderer = require('../services/list_items_reorderer');

exports.index = function (req, res) {
  var userId = req.param('userId');
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
  attrs.userId = userId;
  Checklist.create(attrs, function (error, checklist) {
    if (error) return res.json(500, error.errors);
    res.json({ checklist: checklist });
  });
};

exports.updateReorder = function (req, res) {
  var id  = req.params.id;
  var userId = req.user.id;
  var listItemIds = req.body.listItemIds;

  Checklist.findOne({_id:id, userId:userId}, function (error, checklist) {
    ListItemsReorderer.reorder(checklist, listItemIds);
    checklist.save(function (err, checklist_) { res.json({ checklist: checklist_ }); });
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
  Checklist.findOne({_id:req.params.checklistSlug}, function (error, checklist) {
    User.findById(checklist.userId, function (error_, user) {
      res.format({
        'text/html': function() { res.render('index'); }
      , 'application/json': function () { res.send({checklist: checklist, users: [user]}); }
      });
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
