/**
 * File: src/app/models/Product.js
 * Author: Daniel Carlos Hovadick Félix
 *
 * Define and exports the database schema as a mongoose model.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = Schema({
  name        : { type : String, default : ''},
  description : { type : String, default : ''},
  price       : { type : Number, default : 0 },
  category    : Schema.ObjectId
});

module.exports = mongoose.model('Product', productSchema, 'Product');
