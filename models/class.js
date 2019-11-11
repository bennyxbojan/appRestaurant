// Data Model for Books
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema(
  {
    name: {type: String, required:true}
  }
);

// Export model
module.exports = mongoose.model("class", classSchema);