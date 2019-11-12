// Data Model for Books
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  studentID: { type: Number, required: true },
  name: { type: String, required: true },
  major: { type: String, required: true },
  gpa: { type: Number, required: false },
  classes: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'class'}
});

// Export model
module.exports = mongoose.model("student", studentSchema);
