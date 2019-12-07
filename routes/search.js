var express = require("express");
var router = express.Router();
var Restaurant = require("../models/restaurant");

const week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

// POST route for reading data
router.post("/", function(req, res, next) {
  if (req.body.date && req.body.time && req.body.guest && req.body.city) {
    var date = new Date(req.body.date);
    var weekday = date.getDay();

    var result = Restaurant.find({
      opendays: week[weekday],
      city: req.body.city,
      tables: { $elemMatch: { time: req.body.time } },
      tables: { $elemMatch: { taken: false } },
      tables: { $elemMatch: { size: req.body.guest } }
    });

    result.exec(function(err, tables) {
      if (err) {
        res.status(404).render("error", {
          message: err,
          status: 404
        });
      }
      console.log("success");
    });
  } else {
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
});

module.exports = router;
