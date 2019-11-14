// Route handlers
const express = require("express");
const router = express.Router();

//import data models
const Class = require("../models/class");

// RETRIEVE all classes with a optional query parameter
router.get("/", function(req, res, next) {
  // if users did not enter a query parameter
  if (!req.query.classID) {
    Class.find({})
      //print out class names rather than id
      .exec(function(err, classes) {
        if (err) {
          return next(err);
        }
        res.status(200).render("classes", {
          classes: classes
        });
      });
  }
  //if users did
  else {
    Class.find({ major: req.query.c })
      //print out class names rather than id
      .populate("classes")
      .exec(function(err, students) {
        if (err) {
          return next(err);
        }
        res.render("student", {
          student: students
        });
      });
  }
});

//create a class
router.post("/", function(req, res) {
  var oneClass = new Class(req.body);
  oneClass.save(function(err) {
    if (err) {
      res.status(401).render("error", {
        status: 401,
        message: err
      });
    }
    res.status(201).render("class", {
      oneClass: oneClass
    });
  });
});

module.exports = router;
