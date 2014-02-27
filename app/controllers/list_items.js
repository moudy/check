var _ = require('underscore');
var Checklist = require('../models/checklist');
var ListItemsReorderer = require('../services/list_items_reorderer');

exports.create = function (req, res) {
  var attrs = req.body.listItem;
  var checklistId = req.params.checklistId;
  Checklist.findOne({_id: checklistId, userId: req.user.id}, function (error, checklist) {
    checklist.listItems.push(attrs);
    checklist.save(function (error_, checklist_) {
      if (error_) return res.json(500, error_);
      var last = checklist_.listItems[checklist_.listItems.length-1];
      res.json({listItem: last});
    });
  });
};

exports.update = function (req, res) {
  var id  = req.params.id;
  var attrs = req.body.listItem;
  var checklistId = req.params.checklistId;
  Checklist.findOne({_id: checklistId, userId: req.user.id}, function (error, checklist) {
    var doc = checklist.listItems.id(id);
    _.extend(doc, attrs);
    checklist.save(function (error_) {
      if (error_) return res.json(500, error_);
      res.json({listItem: doc});
    });
  });
};

exports.del = function (req, res) {
  var id = req.params.id;
  var checklistId = req.params.checklistId;
  Checklist.findOne({_id: checklistId, userId: req.user.id}, function (error, checklist) {
    var doc = checklist.listItems.id(id);
    doc.remove();
    ListItemsReorderer.reorder(checklist);
    checklist.save(function (error_) {
      if (error_) return res.json(500, error_);
      res.json({listItem: null});
    });
  });
};
