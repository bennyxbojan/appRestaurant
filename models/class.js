// Data Model for Books
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  classID: {
    type: String,
    required: true,
    unique: true,
    autoIndex: false,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  }
});

// Export model
module.exports = mongoose.model("class", classSchema);
