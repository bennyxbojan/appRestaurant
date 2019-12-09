// Route handlers
const express = require("express");
const router = express.Router();
const geoip = require("geoip-lite");
const Orders = require("../models/order");
const Restaurant = require("../models/restaurant");
var NodeGeocoder = require("node-geocoder");

//import data models
// const Student = require("../models/student");
// const Class = require("../models/class");
//default link redirect to index html page

// var ip = "207.97.227.239";
// var geo = geoip.lookup(ip);

// console.log(geo.city);

var options = {
  provider: "google",
  // Optional depending on the providers
  httpAdapter: "https", // Default
  apiKey: "AIzaSyAjwAu2_yVgLLXB7qGnHBnujwWo5F_VuAo", // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

var today = new Date();
var dd = ("0" + today.getDate()).slice(-2);
var mm = ("0" + (today.getMonth() + 1)).slice(-2);
var yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;

function distance(lat1, lng1, lat2, lng2) {
  const earthRadius = 3958.75; // in miles, change to 6371 for kilometer output

  let dLat = Math.toRadians(lat2 - lat1);
  let dLng = Math.toRadians(lng2 - lng1);

  let sindLat = Math.sin(dLat / 2);
  let sindLng = Math.sin(dLng / 2);

  let a =
    Math.pow(sindLat, 2) +
    Math.pow(sindLng, 2) *
      Math.cos(Math.toRadians(lat1)) *
      Math.cos(Math.toRadians(lat2));

  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let dist = earthRadius * c;

  return dist; // output distance, in MILES
}

router.get("/", function(req, res, next) {
  //get client ip
  var ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);

  var client = ip.split(",")[0];
  // console.log(client)

  //get client address based on ip
  var geo = geoip.lookup(client);
  console.log(geo);

  //find the closet rests
  var curr_ll = geo.ll;

  var compare = {};

  Restaurant.find({ city: geo.city }, function(err, rests) {
    if (err) {
      return next(err);
    } else {
      geocoder.geocode("29 champs elysée paris").then(function(res) {
        console.log(res);
      });
      for (var i = 0; i < rests.length; i++) {
        compare.id = rests[i]._id;
      }
      res.render("index", {
        city: geo.city,
        date: today
      });
    }
  });
});

module.exports = router;
