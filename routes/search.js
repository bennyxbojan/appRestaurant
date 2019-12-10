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

function timeconverter(time){
  if( time.substring(time.length-2,time.length-0) == "PM"){
    if(Number(time.substring(0,time.length-2))== 12){
      return 0
    }else{
    return Number(time.substring(0,time.length-2))+12}
  }else{
  return time}
}

console.log(timeconverter("12PM"))

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

// function validtime (time){
//   var digit = time.substring(0,time.length-2);

//   var apm = time.substring(time.length-2,time.length);

// }

// console.log(validtime("1PM"));

// GET route for reading data
router.get("/", function(req, res, next) {
  //index page when users don't need to give restaurant name
  if (!req.query.restname) {
    if (req.query.date && req.query.time && req.query.guest && req.query.city) {
      var date = new Date(req.query.date);
      var weekday = date.getDay();
      var size = getTableSize(req.query.guest);
      //console.log(size);

      console.log(req.query.city);
      var city = req.query.city.replace(/"/g, "");
      console.log(city);

      Table.find({ time: req.query.time, size: size }, function(err, table) {
        if (err) {
          res.status(err.errors.code).render("error", {
            status: err.errors.code,
            message: err.message,
            redirect: "/"
          });
        } else {
          var tableid = table[0]._id;
          // console.log(table[0]._id);

          var result = Restaurant.find({
            opendays: week[weekday],
            city: city,
            //options: option
            options: { $elemMatch: { table: tableid, taken: false } }
            // options: { $elemMatch: { taken: false } }
          });
          result
            .sort("name")
            .populate("options.table")
            .exec(function(err, rest) {
              if (err) {
                res.status(err.errors.code).render("error", {
                  status: err.errors.code,
                  message: err.message,
                  redirect: "/search"
                });
              } else {
                // console.log(rest)
                // console.log(tableid);
                res.render("restaurants", {
                  rest: rest,
                  tableid: tableid,
                  date: req.query.date,
                  time: req.query.time,
                  guest: req.query.guest,
                  city: city,
                  restname: req.query.restname
                });
              }
            });
        }
      });
    } else {
      var err = new Error("All fields required.");
      err.status = 400;
      res.render("error", {
        status: 400,
        message: err,
        redirect: "/"
      });
    }
    //where users give restaurant name for searching
  } else {
    if (req.query.date && req.query.time && req.query.guest && req.query.city) {
      var date = new Date(req.query.date);
      var weekday = date.getDay();
      var size = getTableSize(req.query.guest);
      // console.log(size);
      console.log(req.query.city);
      var city = req.query.city.replace(/"/g, "");

      Table.find({ time: req.query.time, size: size }, function(err, table) {
        if (err) {
          res.status(err.errors.code).render("error", {
            status: err.errors.code,
            message: err.message,
            redirect: "/"
          });
        } else {
          var tableid = table[0]._id;
          // console.log(table[0]._id);

          var result = Restaurant.find({
            name: { $regex: req.query.restname, $options: "i" },
            opendays: week[weekday],
            city: city,
            //options: option
            options: { $elemMatch: { table: tableid, taken: false } }
            // options: { $elemMatch: { taken: false } }
          });
          result
            .sort("name")
            .populate("options.table")
            .exec(function(err, rest) {
              if (err) {
                res.status(err.errors.code).render("error", {
                  status: err.errors.code,
                  message: err.message,
                  redirect: "/search"
                });
              } else {
                // console.log(rest)
                res.render("restaurants", {
                  rest: rest,
                  tableid: tableid,
                  date: req.query.date,
                  time: req.query.time,
                  guest: req.query.guest,
                  city: city,
                  restname: req.query.restname
                });
              }
            });
        }
      });
    } else {
      var err = new Error("All fields required.");
      err.status = 400;
      res.render("error", {
        status: 400,
        message: err,
        redirect: "/"
      });
    }
  }
});

module.exports = router;
