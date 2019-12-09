// Route handlers
const express = require("express");
const router = express.Router();

//import data models
// const Student = require("../models/student");
// const Class = require("../models/class");
//default link redirect to index html page

function locationSuccess(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var altitude = position.coords.altitude;
  var accuracy = position.coords.accuracy;
  var altitudeAccuracy = position.coords.altitudeAccuracy;
  var heading = position.coords.height;
  var speed = position.coords.speed;
  var timestamp = position.timestamp;

  // work with this information however you'd like!
}

function locationError(error) {
  var code = error.code;
  var message = error.message;

  // read the code and message and decide how you want to handle this!
}

navigator.geolocation.getCurrentPosition(locationSuccess, locationError);

var today = new Date();
var dd = ("0" + today.getDate()).slice(-2);
var mm = ("0" + (today.getMonth() + 1)).slice(-2);
var yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;

router.get("/", function(req, res) {
  res.status(200);
  res.render("index", {
    date: today
  });
});

module.exports = router;
