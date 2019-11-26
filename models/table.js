// Data Model for Books
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var tableSchema = new Schema({
  studentID: {
    type: Number,
    required: true,
    unique: true,
    autoIndex: false,
    trim: true
  },
  name: { type: String, required: true, trim: true },
  major: { type: String, required: true, trim: true },
  gpa: {
    type: Number,
    trim: true,
    min: [0, "GPA number cannot be lower than 0"],
    max: [4, "GPA number cannot be higher than 4"]
  },
  classes: [{
    trim: true,
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "class"
  }]
});

// Export model
module.exports = mongoose.model("Table", tableSchema);
