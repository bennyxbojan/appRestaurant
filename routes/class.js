// Route handlers
const express = require('express');
const router = express.Router()

//import data models
const Class = require("../models/class");

// RETRIEVE all classes
router.get("/", function(req,res){
  Class.find({}, function (err, classes_list){
    res.render("classes", {classes:classes_list});
  });
});

module.exports = router;