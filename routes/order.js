var express = require("express");
var router = express.Router();
// const auth = require('./auth');
var User = require("../models/user");

function checkClient(req, res, next) {
  if (req.session.userID) {
    next(); //If session exists, proceed to page
  } else {
    var err = new Error("You must be logged into see this page");
    next(err); //Error, trying to access unauthorized page!
  }
}

router.post("/", function(req, res, next){
  
  
  
});

module.exports = router;
