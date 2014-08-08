var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {type: String, required: true, trim: true, lowercase: true, unique: true, index: true}
, githubProfileRaw: {type: String, required: true, select: false}
, gravatarId: {type: String}
, githubId: {type: String, required:true, trim:true, unique: true, index:true}
, recentlyViewed: [String]
});

UserSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

UserSchema.virtual('profileImageUrl').get(function(){
  return 'http://www.gravatar.com/avatar/'+this.gravatarId;
});

UserSchema.virtual('links').get(function(){
  return {
    checklists: '/api/users/'+this.id+'/checklists'
  };
});

UserSchema.set('toJSON', {virtuals: true});

[ [require('mongoose-unique-validator')]
, [require('mongoose-findorcreate')]
, [require('../../lib/mongoose-find-by-whatever'), [{email: /@/}, { _id: 'ObjectId'}, {username: '*'}]]
].forEach(function (plugin) {
  UserSchema.plugin.apply(UserSchema, plugin);
});

module.exports = mongoose.model('User', UserSchema, 'users');
