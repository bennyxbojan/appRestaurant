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
    {
      _id: {
        type: Number,
        required: true,
        unique: true,
        autoIndex: false
      },
      time: {
        type: String,
        match: /^[0-9]{1,2}[AP]M$/,
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
module.exports = mongoose.model("Order", orderSchema);
