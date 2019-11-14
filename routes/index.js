// Route handlers
const express = require("express");
const router = express.Router();

//import data models
const Student = require("../models/student");
const Class = require("../models/student");

//default link redirect to index html page
router.get("/", function(req, res) {
  res.status(200).render("../public/index.html");
});

//get all database record
router.get("/list", async function(req, res) {
  var students;
  var classes;

  await Student.find({}, function(err, s) {
    if (err) {
      res.status(404).render("error", {
        message: err,
        status: 404
      });
    } else {
      console.log(s);
      students = s;
    }
  });
  await Class.find({}, function(err, c) {
    if (err) {
      res.status(404).render("error", {
        message: err,
        status: 404
      });
    } else {
      console.log(c);
      classes = c;
    }
  });
  res.status(200).render("list", {
    students: students,
    classes: classes
  });
});

module.exports = router;
