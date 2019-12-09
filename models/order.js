const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var orderSchema = new Schema({
  orderNum: {
    type: Number,
    unique: true,
    required: true,
    default:10000
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  restID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Restaurant"
  },
  date: {
    type: String,
    required: true,
    trim: true
  },
  guest: {
    type: Number,
    required: true
  },
  guestname:{
    type: String,
    required:true,
    trim:true
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Table"
  }
});

orderSchema.plugin(autoIncrement.plugin, {
    model: 'Order',
    field: 'OrderNum',
    startAt: 10000,
    incrementBy: 1
});


// Export model
var Order = mongoose.model('Order', orderSchema);
module.exports = Order;