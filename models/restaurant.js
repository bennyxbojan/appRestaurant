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
    match: "[0-9]{5}(-[0-9]{4})?",
    trim: true
  },
  cuisine: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    min: [1, "Please enter a price level between 1 and 5"],
    max: [5, "Please enter a price level between 1 and 5"]
  },
  opendays: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref:"Week"
  }],
  tables: [
    {
      _id: {
        type: Number,
        required: true,
        unique: true,
        autoIndex: false
      },
      time: {
        type: String,
        match: "[0-9]{1,2}[AP]M",
        required: true,
        trim: true
      },
      taken: {
        type: Boolean,
        required: true
      },
      size: {
        type: Number,
        required: true
      }
    }
  ]
});

// Export model
module.exports = mongoose.model("Restaurant", restaurantSchema);
