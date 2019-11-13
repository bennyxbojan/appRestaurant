// Data Model for Books
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  classID: { type: String, required: true, unique: true, autoIndex: false },
  name: { type: String, required: true }
});

// Export model
module.exports = mongoose.model("class", classSchema);
