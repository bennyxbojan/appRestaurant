// Data Model for Books
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    title: {type: String},
    author: {type: String},
    rating: {type: Number}
  }
);

// Export model
module.exports = mongoose.model("student", studentSchema);