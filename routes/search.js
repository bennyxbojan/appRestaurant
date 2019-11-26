var express = require("express");
var router = express.Router();
var Restaurant = require("../models/restaurant");

// GET route for reading data
router.get("/", function(req, res, next) {
  if (req.body.date && req.body.time && req.body.guest && req.body.city) {
    var date = new Date(req.body.date);
    var weekday = date.getDay();
    var taken = false;
    
    
    var query = Restaurant.find({opendays: weekday}, {city:req.body.city}, {tables: {$elemMatch : {"time": req.body.time}}}, {tables: {$elemMatch : {"taken": false}}});
    
    
  }else{
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
  
});


module.exports = router;
