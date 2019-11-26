const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var weekSchema = new Schema({
  _id:{
    type:Number,
    min:0,
    max:6
  },
  weekday:{
    type:String,
    required:true,
    trim:true
  }
});

// Export model
module.exports = mongoose.model("weekdays", weekSchema);
