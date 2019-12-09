// Route handlers
const express = require("express");
const router = express.Router();
const geoip = require("geoip-lite");
const Orders = require("../models/order");
const Restaurant = require("../models/restaurant");
var NodeGeocoder = require('node-geocoder');

//import data models
// const Student = require("../models/student");
// const Class = require("../models/class");
//default link redirect to index html page

// var ip = "207.97.227.239";
// var geo = geoip.lookup(ip);

// console.log(geo.city);

var options = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
 
var geocoder = NodeGeocoder(options);

var today = new Date();
var dd = ("0" + today.getDate()).slice(-2);
var mm = ("0" + (today.getMonth() + 1)).slice(-2);
var yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;

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
  
  Restaurant.find({city: geo.city}, function(err,rests){
    if (err){
      return next(err);
    }else{
      
    }
  })
  
  res.render("index", {
    city: geo.city,
    date: today
  });
});




module.exports = router;
 