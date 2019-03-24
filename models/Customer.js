const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CustomerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }, 
  name: {
    type: String
  },  
   address: {
    type: String
  }, 
   phone: {
    type: String
  }, 
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Customer = mongoose.model('customer', CustomerSchema);
