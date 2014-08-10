var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var ListItemSchema = require('./list-item-schema');
var getSlug = require('speakingurl');
//var SlugSetter = require('app/services/slug-setter');

var ChecklistSchema = new Schema({
  title: {type: String, required:true, trim:true}
, slug: {type: String, required:true, trim:true}
, username: {type: String, required:true, trim:true}
, description: {type: String}
, body: {type: String}
, listItems: [ListItemSchema]
, listItemsOrder: {type: String}
, userId: {type: ObjectId, required: true}
});

ChecklistSchema.plugin(require('mongoose-find-by-whatever'), [
  {_id: 'ObjectId'}
, {slug: '*'}
]);

ChecklistSchema.virtual('id').get(function(){ return this._id.toHexString(); });
ChecklistSchema.set('toJSON', {virtuals: true});

ChecklistSchema.pre('validate', function (next) {
  this.slug = getSlug(this.title);
  next();
});

if (!ChecklistSchema.options.toJSON) ChecklistSchema.options.toObject = {};
ChecklistSchema.options.toJSON.transform = function (doc, ret) {
  delete ret._id;
  delete ret.__v;
};

module.exports = mongoose.model('Checklist', ChecklistSchema, 'checklists');
