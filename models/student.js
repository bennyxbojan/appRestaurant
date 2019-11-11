// Data Model for Books
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    studentID: {}
    name: {type: String, required: true},
    major: {type: String, required: true},
    gpa: {type: Number, required: false},
    classes: {type: [String], required:false}
  }
);

// Export model
module.exports = mongoose.model("student", studentSchema);