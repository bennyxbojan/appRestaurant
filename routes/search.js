var express = require("express");
var router = express.Router();
var Restaurant = require("../models/restaurant");
var Table = require("../models/table");

const week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

// POST route for reading data
router.get("/", function(req, res, next) {
  if (req.query.date && req.query.time && req.query.guest && req.query.city) {
    var date = new Date(req.query.date);
    var weekday = date.getDay();

    var result = Restaurant.find({
      opendays: week[weekday],
      city: req.query.city,
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
      else{
        res.render("restaurants",{
                  tables:tables})
      }
    });
  } else {
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
});

module.exports = router;
