var Checklist = require('../models/checklist');

exports.index = function (req, res) {
  Checklist.find(function (error, checklists) {
    res.json({
      checklists: checklists
    });
  });
};

exports.create = function (req, res) {
  var attrs = req.body.checklist;
  delete attrs.listItems;
  Checklist.create(attrs, function (error, checklist) {
    res.json({
      checklist: checklist
    });
  });
};

exports.update = function (req, res) {
  var id  = req.params.id;
  var attrs = req.body.checklist;
  delete attrs.listItems;
  Checklist.findByIdAndUpdate(id, attrs, function (error, checklist) {
    res.json({
      checklist: checklist
    });
  });
};

exports.show = function (req, res) {
  Checklist.findById(req.params.checklistSlug, function (error, checklist) {
    res.format({
      'text/html': function() { res.render('index'); }
    , 'application/json': function () { res.send({checklist: checklist}); }
    });
  });
};

exports.del = function (req, res) {
  Checklist.findByIdAndRemove(req.params.id, function () {
    res.format({
      'text/html': function() { res.render('index'); }
    , 'application/json': function () { res.send({checklist: null}); }
    });
  });
};
