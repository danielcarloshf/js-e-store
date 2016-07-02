/**
 * File: src/app/models/User.js
 * Author: Daniel Carlos Hovadick Félix
 *
 * Define and exports the database schema as a mongoose model
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

/* Attributes.*/

var userSchema = mongoose.Schema({
  username  : { type : String, default : '' },
  password  : { type : String, default : '' },
  firstname : { type : String, default : '' },
  lastname  : { type : String, default : '' },
});

/* Methods. */

// Generating a hash:
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checking if password is valid:
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// Create and exposes the model:
module.exports = mongoose.model('User', userSchema, 'User');
