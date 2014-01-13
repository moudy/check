var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListItemSchema = new Schema({
  title: { type: String, trim:true }
, description: { type: String, trim:true }
});

var ChecklistSchema = new Schema({
  title: { type: String, required:true, trim:true }
, description: { type: String, trim:true }
, listItems: [ListItemSchema]
});

ListItemSchema.virtual('checklistId').get(function(){
  return this.parent()._id.toHexString();
});
ChecklistSchema.virtual('id').get(function(){
  return this._id.toHexString();
});
ListItemSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

ListItemSchema.set('toJSON', {virtuals: true});
ChecklistSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Checklist', ChecklistSchema, 'checklists');
