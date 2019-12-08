const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var orderSchema = new Schema({
  orderNum: {
    type: Number,
    unique: true,
    required: true,
    default: 10000
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  restID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Restaurant"
  },
  date: {
    type: String,
    required: true,
    trim: true
  },
  guest: {
    type: Number,
    required: true
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Table"
  }
});

var Order = mongoose.model("Order", orderSchema);

orderSchema.pre("save", function(next) {
  var doc = this;
  Order.findByIdAndUpdate(
    { _id: "entityId" },
    { $inc: { orderNum: 1 } },
    function(error, order) {
      if (error) return next(error);
      doc.testvalue = order.orderNum;
      next();
    }
  );
});
// Export model
module.exports = mongoose.model("Order", orderSchema);
