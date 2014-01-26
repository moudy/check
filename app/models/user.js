var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator').validate;

var validations = { email: [validate('isEmail')] };

var UserSchema = new Schema({
  username: {type: String, required:true, trim:true, lowercase:true, unique: true, index:true}
, email: {type: String, trim:true, required:true, lowercase:true, unique: true, validate: validations.email, index:true}
});

UserSchema.virtual('id').get(function(){ return this._id.toHexString(); });
UserSchema.virtual('profileImageUrl').get(function(){ return this.gravatar({size: 50}); });

UserSchema.set('toJSON', {virtuals: true});

[ [require('mongoose-timestamp')]
, [require('mongoose-unique-validator')]
, [require('mongoose-gravatar')]
, [require('mongoose-findorcreate')]
, [require('passport-local-mongoose')]
, [require('../../lib/mongoose-find-by-whatever'), [{email: /@/}, { _id: 'ObjectId'}, {username: '*'}]]
].forEach(function (plugin) {
  UserSchema.plugin.apply(UserSchema, plugin);
});

module.exports = mongoose.model('User', UserSchema, 'users');
