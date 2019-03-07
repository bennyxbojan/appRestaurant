// Data Model for Authors
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    title: {type: String, required: true},
    author: {type: Schema.Type.ObjectId, ref: "Author", required: true},
    summary:{type: String, required: true},
    isbn: {type: String, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: "Genre"}]

// Export model
module.exports = mongoose.model("Author", AuthorSchema);