const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var weekSchema = new Schema({
  weekNum:{
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
var Week = mongoose.model('Week', weekSchema);
module.exports = Week;
