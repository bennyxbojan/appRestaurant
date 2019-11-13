// Data Model for Books
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  studentID: { type: Number, required: true, unique: true, autoIndex: false },
  name: { type: String, required: true },
  major: { type: String, required: true },
  gpa: {
    type: Number,
    required: false,
    min: [0, "GPA cannot be less than 0"],
    max: [4, "GPA cannot be larger than 4"]
  },
  classes: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "class"
  }
});

// Export model
module.exports = mongoose.model("student", studentSchema);
