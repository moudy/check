var Checklist = require('../models/checklist');

exports.create = function (req, res) {
  var attrs = req.body.listItem;
  Checklist.findById(attrs.checklist, function (error, checklist) {
    checklist.listItems.push(attrs);
    checklist.save(function (error_, checklist_) {
      var last = checklist_.listItems[checklist_.listItems.length-1];
      res.json({listItem: last});
    });
  });
};

exports.update = function (req, res) {
  var id  = req.params.id;
  var attrs = req.body.listItem;
  Checklist.findById(attrs.checklistId, function (error, checklist) {
    var doc = checklist.listItems.id(id);
    if (attrs.title) doc.title = attrs.title;
    if (attrs.description) doc.description = attrs.description;
    checklist.save(function (error_) {
      res.json({listItem: doc});
    });
  });
};

exports.del = function (req, res) {
  var id = req.params.id;
  Checklist.findById(id, function (error, checklist) {
    var doc = checklist.listItems.id(id);
    doc.remove();
    checklist.save(function (error_) {
      res.json({listItem: null});
    });
  });
};
