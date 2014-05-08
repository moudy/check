//var User = require('../models/user');
var Checklist = require('../models/checklist');
var ListItemsReorderer = require('../services/list_items_reorderer');

exports.updateReorder = function (req, res) {
  var id  = req.params.id;
  var userId = req.user.id;
  var listItemIds = req.body.listItemIds;

  Checklist.findOne({_id:id, userId:userId}, function (error, checklist) {
    ListItemsReorderer.reorder(checklist, listItemIds);
    checklist.save(function (err, checklist_) { res.json({ checklist: checklist_ }); });
  });
};
