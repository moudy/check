var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var ListItemSchema = new Schema({
  title: { type: String, trim:true, required:true}
, description: { type: String, trim:true }
});

var ChecklistSchema = new Schema({
  title: { type: String, required:true, trim:true }
, description: { type: String, trim:true }
, listItems: [ListItemSchema]
, userId: {type: mongoose.Schema.ObjectId, required:true}
});

ListItemSchema.virtual('checklistId').get(function(){ return this.parent()._id.toHexString(); });
ChecklistSchema.virtual('id').get(function(){ return this._id.toHexString(); });
ListItemSchema.virtual('id').get(function(){ return this._id.toHexString(); });

ListItemSchema.set('toJSON', {virtuals: true});
ChecklistSchema.set('toJSON', {virtuals: true});

ChecklistSchema.plugin(timestamps);
ListItemSchema.plugin(timestamps);

module.exports = mongoose.model('Checklist', ChecklistSchema, 'checklists');
