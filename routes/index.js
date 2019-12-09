// Route handlers
const express = require("express");
const router = express.Router();

//import data models
// const Student = require("../models/student");
// const Class = require("../models/class");
//default link redirect to index html page
 

var city;
var error;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    error = "Geolocation is not supported by this browser.";
  }
}

function getCity(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}

var today = new Date(); 
var dd = ("0" + today.getDate()).slice(-2);
var mm = ("0" + (today.getMonth() + 1)).slice(-2);
var yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;

router.get("/", function(req, res) {
  res.status(200);
  res.render("index",{
    date:today  
  })
}); 



module.exports = router;
