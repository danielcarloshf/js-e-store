/**
 * File: src/app/models/Address.js
 * Author: Daniel Carlos Hovadick Félix
 *
 * Define and exports the database schema as a mongoose model.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Address attributes. */
var addressSchema = Schema({
  street   : { type : String, default : '' },
  city     : { type : String, default : '' },
  number   : { type : Number, default : 0  },
  zipcode  : { type : String, default : '' },
  state    : { type : String, default : '' },
  country  : { type : String, default : '' },
  username : { type : String, default : '' }
});

/* Export the model. */
module.exports = mongoose.model('Address', addressSchema, 'Address');
