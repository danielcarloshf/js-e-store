/**
 * File: src/app/models/CartItem.js
 * Author: Daniel Carlos Hovadick Félix
 *
 * Define and exports the database schema as a mongoose model.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cartItemSchema = Schema({
  product  : Schema.ObjectId,
  quantity : { type : Number, default : 0 },
  username : { type : String, default : '' }
});

module.exports = mongoose.model('CartItem', cartItemSchema, 'CartItem');
