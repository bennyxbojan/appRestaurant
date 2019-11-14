// Route handlers
const express = require("express");
const router = express.Router();

//import data models
const Class = require("../models/class");

// RETRIEVE all classes with a optional query parameter (classID)
router.get("/", function(req, res) {
  // if users did not enter a query parameter
  if (!req.query.classID) {
    Class.find({}, function(err, classes) {
      if (err) {
        res.status(404).render("error", {
          message: err,
          status: 404
        });
      }
      res.status(200).render("classes", {
        classes: classes
      });
    });
  }
  //if users did
  else {
    Class.find({ classID: req.query.classID }, function(err, classes) {
      if (err) {
        res.status(404).render("error", {
          message: err,
          status: 404
        });
      }
      res.render("classes", {
        classes: classes
      });
    });
  }
});

//create a class
router.post("/", function(req, res) {
  var oneClass = new Class(req.body);
  oneClass.save(function(err) {
    if (err) {
      res.status(204).render("error", {
        status: 204,
        message: err
      });
    }
    res.status(201).render("class", {
      oneClass: oneClass
    });
  });
});

module.exports = router;
