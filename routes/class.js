// Route handlers
const express = require('express');
const router = express.Router()

//import data models
const Class = require("../models/class");

// RETRIEVE all classes
router.get("/", function(req,res){
  Class.find({}, function (err, classes_list){
    res.status(200).render("classes", {classes:classes_list});
  });
});

// RETRIEVE one specific class by classID
router.get("/:classID", function(req,res){
  Class.find({}, function (err, classes_list){
    res.status(200).render("classes", {classes:classes_list});
  });
});

module.exports = router;

//create a class
router.post("/", function(req, res) {
  var oneClass = new Class(req.body);
  oneClass.save(function(err) {
    if (err) {
      res.status(400).render("error",
        send(err);
    }
    res.status(201).render("class", {
      oneClass:oneClass
    });
  });
});
