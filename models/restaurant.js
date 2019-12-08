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
    match: [/^[0-9]{5}(-[0-9]{4})?$/, "Please enter a valid zip code"],
    trim: true
  },
  img: {
    type: String,
    trim: true,
    required: true
  },
  cuisine: {
    type: String,
    trim: true,
    required: true
  },
  price: {
    type: Number,
    min: [1, "Please enter a price level between 1 and 5"],
    max: [5, "Please enter a price level between 1 and 5"],
    required: true
  },
  opendays: [
    {
      type: [String],
      required: true,
      trim: true
    }
  ],
  options: [
    {
      table: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Table"
      },
      taken: {
        type: Boolean,
        required: true,
        default:false
        
      }
    }
  ]
});

// Export model
module.exports = mongoose.model("Restaurant", restaurantSchema);
