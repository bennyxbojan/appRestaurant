// Data Model for Books
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var tableSchema = new Schema({
  resturant
});

// Export model
module.exports = mongoose.model("Table", tableSchema);
