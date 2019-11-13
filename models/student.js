// Data Model for Books
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  studentID: { type: Number, required: true, unique: true, autoIndex: false },
  name: { type: String, required: true },
  major: { type: String, required: true },
  gpa: {
    type: Number,
    validate: {
      validator: function(v) {
        return /^[0-4]\.\d\d$/.test(v);
      },
      message: props => `${props.value} is not a valid GPA number!`
    },
    required: true
  },
  classes: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "class"
  }
});

// Export model
module.exports = mongoose.model("student", studentSchema);
