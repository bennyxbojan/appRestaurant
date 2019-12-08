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
    required:true,
    enum:['small','medium','large','party']
  }
});

//make the combination of time + size unique
tableSchema.index({ "time": 1, "size": 1}, { "unique": true });

// Export model
module.exports = mongoose.model("Table", tableSchema);