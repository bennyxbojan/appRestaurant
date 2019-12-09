// Route handlers
const express = require("express");
const router = express.Router();
const geoip = require("geoip-lite");

//import data models
// const Student = require("../models/student");
// const Class = require("../models/class");
//default link redirect to index html page


// var ip = "207.97.227.239";
// var geo = geoip.lookup(ip);

// console.log(geo.city);

var today = new Date();
var dd = ("0" + today.getDate()).slice(-2);
var mm = ("0" + (today.getMonth() + 1)).slice(-2);
var yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;

router.get("/", function(req, res) {
var ip = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress
  var geo = geoip.lookup(ip[0])
  console.log(req.ip);
  res.status(200);
  res.render("index", {
    city:geo.city,
    date: today
  });
});

module.exports = router;
