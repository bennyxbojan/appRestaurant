// Data Model for Books
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  studentID: {
    type: Number,
    required: true,
    unique: true,
    autoIndex: false,
    trim: true,
    validate: {
      validator: function(v) {
        return /\d{,7}/.test(v);
      },
      message: props => `${props.value} is not a valid student ID!`
    },
  },
  name: { type: String, required: true, trim: true },
  major: { type: String, required: true, trim: true },
  gpa: {
    type: Number,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[0-4]\.\d\d$/.test(v);
      },
      message: props => `${props.value} is not a valid GPA number!`
    },
    required: true
  },
  classes: {
    trim: true,
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "class"
  }
});

// Export model
module.exports = mongoose.model("student", studentSchema);
