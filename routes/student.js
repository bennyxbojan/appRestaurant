// Route handlers
const express = require("express");
const router = express.Router();

//import data models
const Student = require("../models/student");
const Class = require("../models/class");

// RETRIEVE all students with a optional query parameter (major)
router.get("/", function(req, res) {
  // if users did not enter a query parameter
  if (!req.query.major) {
    Student.find({})
      .populate("classes")
      .exec(function(err, students) {
        if (err) {
          res.status(404).render("error", {
            message: err,
            status: 404
          });
        }
        res.status(200).render("students", {
          students: students
        });
      });
  }
  //if users did
  else {
    Student.find({ major: req.query.major })
      .populate("classes")
      .exec(function(err, students) {
        if (err) {
          res.status(404).render("error", {
            message: err,
            status: 404
          });
        }
        res.render("students", {
          students: students
        });
      });
  }
});

//DELETE a student by student ID
router.delete("/:studentId", function(req, res) {
  Student.findOneAndRemove({ studentID: req.params.studentId }, function(
    err,
    student
  ) {
    student.remove(function(err) {
      if (err) {
        res.status(404).render("error", {
          message: err,
          status: 404
        });
      } else {
        //print all student records ==> confirm the record is del
        Student.find({ major: req.query.major })
          .populate("classes")
          .exec(function(err, students) {
            if (err) {
              res.status(404).render("error", {
                message: err,
                status: 404
              });
            }
            res.render("students", {
              students: students
            });
          });
      }
    });
  });
});

//CREATE
router.post("/", function(req, res, next) {
  var student = new Student(req.body);
  console.log(student);
  student.save(function(err, student) {
    if (err) {
      res.status(401).render("error", {
        message: err,
        status: 401
      });
    }
    Student.find({ studentID: student.studentID })
      .populate("classes")
      .exec(function(err, s) {
        console.log(s);
        if (err) {
          res.status(401).render("error", {
            message: err,
            status: 401
          });
        }
        res.status(201).render("student", {
          student: s
        });
      });
  });
});

//UPDATE
router.put("/:studentId", function(req, res) {
  Student.find(req.params.studentId, function(err, book) {
    book.title = req.body.title;
    book.author = req.body.author;
    book.rating = req.body.title;
    book.save();
    res.json(book);
  });
});

module.exports = router;
