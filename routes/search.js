var express = require("express");
var router = express.Router();
var Restaurant = require("../models/restaurant");
var Table = require("../models/table");

const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function getTableSize(guest) {
  var size;
  if (guest > 0 && guest <= 2) {
    size = "small";
  } else if (guest > 2 && guest <= 4) {
    size = "medium";
  } else if (guest > 4 && guest <= 6) {
    size = "large";
  } else if (guest > 6) {
    size = "party";
  }
  return size;
}


// POST route for reading data
router.get("/", function(req, res, next) {
  if (req.query.date && req.query.time && req.query.guest && req.query.city) {
    var date = new Date(req.query.date);
    var weekday = date.getDay();
    var size = getTableSize(req.query.guest);
    console.log(size);

    Table.find({ time: req.query.time, size: size }, function(err, table) {
      if (err) {
        return next(err);
      } else {
        var tableid = table[0]._id;
        // console.log(table[0]._id);
      }
      // var option = {
      //   table: tableid,
      //   taken: false
      // };
      // console.log(option);

      var result = Restaurant.find({
        opendays: week[weekday],
        city: req.query.city,
        //options: option
         options: { $elemMatch: { table: tableid } },
         options: { $elemMatch: { taken: false } }
      });

      result.populate("options.table").exec(function(err, rest) {
        if (err) {
          res.status(404).render("error", {
            message: err,
            status: 404
          });
        } else {
          //console.log(rest)
          res.render("restaurants", {
            rest: rest,
            date: req.query.date,
            time: req.query.time,
            guest: req.query.guest,
            city: req.query.city
          });
        }
      });
    });
  } else {
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
});

module.exports = router;
