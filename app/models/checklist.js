var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ListItemSchema = new Schema({
  description: {type: String}
, index: {type: Number}
});

var ChecklistSchema = new Schema({
  title: {type: String, required:true, trim:true}
, username: {type: String, required:true, trim:true}
, description: {type: String}
, listItems: [ListItemSchema]
, listItemsOrder: {type: String}
, userId: {type: ObjectId, required: true}
});

ListItemSchema.virtual('checklistId').get(function(){ return this.parent()._id.toHexString(); });

[ChecklistSchema, ListItemSchema].forEach(function (schema) {
  schema.virtual('id').get(function(){ return this._id.toHexString(); });
  schema.set('toJSON', {virtuals: true});
  schema.plugin(timestamps);
});


if (!ChecklistSchema.options.toJSON) ChecklistSchema.options.toObject = {};
ChecklistSchema.options.toJSON.transform = function (doc, ret) {
  delete ret._id;
  delete ret.__v;
};

if (!ListItemSchema.options.toJSON) ListItemSchema.options.toObject = {};
ListItemSchema.options.toJSON.transform = function (doc, ret) {
  delete ret._id;
  if ('undefined' === typeof ret.index) {
    var lis = doc.parent().listItems;
    ret.index = lis.indexOf(doc);
  }
};

module.exports = mongoose.model('Checklist', ChecklistSchema, 'checklists');
