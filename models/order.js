const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var orderSchema = new Schema({
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
    required:true,
  },
  tables: [
    
  ]
});

// Export model
module.exports = mongoose.model("Order", orderSchema);
