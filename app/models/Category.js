/**
 * File: src/app/models/Category.js
 * Author: Daniel Carlos Hovadick Félix
 *
 * Define and exports the database schema as a mongoose model.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var categorySchema = Schema({
  name        : { type : String, default : ''},
  description : { type : String, default : ''}
});

module.exports = mongoose.model('Category', categorySchema, 'Category');
