var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var ListItemSchema = new Schema({
  description: {type: String}
});

var ChecklistSchema = new Schema({
  title: {type: String, required:true, trim:true}
, description: {type: String, trim:true}
, listItems: [ListItemSchema]
, listItemsOrder: {type: String}
, userId: {type: mongoose.Schema.ObjectId, required:true}
});

ChecklistSchema.virtual('id').get(function(){ return this._id.toHexString(); });

ListItemSchema.virtual('id').get(function(){ return this._id.toHexString(); });
ListItemSchema.virtual('checklistId').get(function(){ return this.parent()._id.toHexString(); });

ListItemSchema.set('toJSON', {virtuals: true});
ChecklistSchema.set('toJSON', {virtuals: true});

ChecklistSchema.plugin(timestamps);
ListItemSchema.plugin(timestamps);

if (!ChecklistSchema.options.toJSON) ChecklistSchema.options.toObject = {};
ChecklistSchema.options.toJSON.transform = function (doc, ret, options) {
  delete ret._id;
  delete ret.__v;
  if (!ret.listItemsOrder) {
    ret.listItemsOrder = doc.listItems.map(function (li) { return li.id; }).join(',');
  }
  ret.listItems = ret.listItemsOrder.split(',').map(function (id) {
    var d = doc.listItems.id(id);
    return d ? d.toJSON() : {};
  });
};

if (!ListItemSchema.options.toJSON) ListItemSchema.options.toObject = {};
ListItemSchema.options.toJSON.transform = function (doc, ret, options) {
  delete ret._id;
};

module.exports = mongoose.model('Checklist', ChecklistSchema, 'checklists');
