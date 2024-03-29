var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var getSlug = require('speakingurl');

var ChecklistSchema = new Schema({
  title: {type: String, required:true, trim:true}
, slug: {type: String, required:true, trim:true}
, username: {type: String, required:true, trim:true}
, description: {type: String}
, body: {type: String}
, stepCount: {type: Number, default: 0}
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

ChecklistSchema.pre('save', function (next) {
  this.stepCount = (this.body || '').split('[x]').length;
  next();
});

if (!ChecklistSchema.options.toJSON) ChecklistSchema.options.toObject = {};
ChecklistSchema.options.toJSON.transform = function (doc, ret) {
  delete ret._id;
  delete ret.__v;
};

module.exports = mongoose.model('Checklist', ChecklistSchema, 'checklists');
