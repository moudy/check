var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListItemSchema = new Schema({
  description: {type: String}
, index: {type: Number}
});

ListItemSchema.virtual('checklistId').get(function(){
  return this.parent()._id.toHexString();
});

ListItemSchema.virtual('id').get(function(){ return this._id.toHexString(); });
ListItemSchema.set('toJSON', {virtuals: true});

if (!ListItemSchema.options.toJSON) ListItemSchema.options.toObject = {};
ListItemSchema.options.toJSON.transform = function (doc, ret) {
  delete ret._id;
  if ('undefined' === typeof ret.index) {
    var lis = doc.parent().listItems;
    ret.index = lis.indexOf(doc);
  }
};

module.exports = ListItemSchema;

