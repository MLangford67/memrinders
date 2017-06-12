import mongoose = require('mongoose');
import crypto = require('crypto');
import jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  displayName: String,
  facebookId: String,
  email: {type: String, unique: true},
  passwordHash: String,
  salt: String,
  role: String
})

UserSchema.method('setPassword', function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
})

UserSchema.method('validatePassword', function(password){
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
  return (hash === this.passwordHash);
})

UserSchema.method('generateJWT', function(role){
  return jwt.sign({
    id: this._id,
    displayName: this.displayName,
    username: this.username,
    email: this.email,
    role: role
  }, 'SecretKey')
})

export default mongoose.model('User', UserSchema);
