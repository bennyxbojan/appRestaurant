// Route handlers
const express = require("express");
const router = express.Router();

//import data models
const Student = require("../models/student");
const Class = require("../models/class");

// RETREIVE all students with an optional query parameter (department/major)
router.get("/", function(req, res, next) {
  // if users did not enter a query parameter
  if (!req.query.major) {
    Student.find({})
      //print out class names rather than id
      .populate("classes")
      .exec(function(err, students) {
        if (err) {
          return next(err);
        }
        res.status(200).render("student", {
          student: students
        });
      });
  }
  //if users did
  else {
    Student.find({ major: req.query.major })
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
  Student.findById(req.params.studentId, function(err, book) {
    book.title = req.body.title;
    book.author = req.body.author;
    book.rating = req.body.title;
    book.save();
    res.json(book);
  });
});

//DELETE
router.delete("/:bookId", function(req, res) {
  Book.findById(req.params.bookId, function(err, book) {
    book.remove(function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send("removed");
      }
    });
  });
});
module.exports = router;
