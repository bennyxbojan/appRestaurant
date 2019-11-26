const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  zip: {
    type: String,
    required: true,
    match: "^d{5}(-d{4})?$",
    trim: true
  },
  cuisine: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    min: 1,
    max: 5
  },
  opendays: {
    type: [String],
    required: true,
    trim: true
  },
  openhours: {
    type: [Number],
    required: true
  },
  tables: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "table",
    trim: true,
  }]
  
});


// Export model
module.exports = mongoose.model("Restaurant", restaurantSchema);