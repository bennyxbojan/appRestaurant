var mongoose = require("mongoose");

var RestaurantSchema = new mongoose.Schema({
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
  tables
  
});
