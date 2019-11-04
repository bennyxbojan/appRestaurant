// Data Model for Books
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    bookId: {type: String},
    title: {type: String},
    author: {type: String},
    rating: {type: Number}
  }
);

// Export model
module.exports = mongoose.model("book", BookSchema);