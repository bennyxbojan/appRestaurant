const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var tableSchema = new Schema({
  time:{
    type: String,
    match: /^[0-9]{1,2}[AP]M$/,
    required: true,
    trim: true
  },
  size:{
    type: String,
    required:true
  }
});

// Export model
module.exports = mongoose.model("Table", tableSchema);
