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
    min: [1,"Please enter a price level between 1 and 5"],
    max: [5,"Please enter a price level between 1 and 5"]
  },
  opendays: {
    type: [String],
    required: true,
    trim: true
  },
  openhours: {
    type: [String],
    required:true,
    trim:true
  },
  tables: {
    type: [tables],
    required: true
  }
  
});

var tables = new Schema({
  time:{
    type:mongoose.Schema.Types.ObjectId,
  },
  
  people:{
    type:Number,
    required:true
  },
  taken:{
    type:Boolean,
    required:true
  }
  
})


// Export model
module.exports = mongoose.model("Restaurant", restaurantSchema);