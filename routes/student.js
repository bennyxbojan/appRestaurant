// Route handlers
const express = require("express");
const router = express.Router();

//import data models
const Student = require("../models/student");
const Class = require("../models/class");


// RETRIEVE all students with a optional query parameter (major)
router.get("/", function(req, res) {
  // if users did not enter a query parameter
  if (!req.query.classID) {
    Class.find({}, function(err, students) {
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
    Class.find({ major: req.query.major }, function(err, students) {
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
