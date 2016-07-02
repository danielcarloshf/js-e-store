/**
 * File: src/app/models/Order.js
 * Author: Daniel Carlos Hovadick Félix
 *
 * Define and exports the database schema as a mongoose model.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var orderSchema = Schema({
  username : { type : String, default : '' },
  total    : { type : Number, default : 0  },
  date     : { type : Date,   default : '' },
  address  : {
    street   : { type : String, default : '' },
    city     : { type : String, default : '' },
    number   : { type : Number, default : 0  },
    zipcode  : { type : String, default : '' },
    state    : { type : String, default : '' },
    country  : { type : String, default : '' },
  },
  items    : [{
    code     : Schema.ObjectId,
    name     : { type : String, default : '' },
    price    : { type : Number, default : 0  },
    quantity : { type : Number, default : 0  }
  }]
});

module.exports = mongoose.model('Order', orderSchema, 'Order');
