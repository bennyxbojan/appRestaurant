// Route handlers
const express = require("express");
const router = express.Router();

//import data models
const Student = require("../models/student");
const Class = require("../models/student");

// RETREIVE all books
router.get("/", function(req, res) {
  Student.find({}, function (err, student_list){
    res.render("index", {students:student_list});
  });
});

// RETRIEVE a specific book
router.get("/:studentId", function(req, res) {
  Student.findById(req.params.studentId, function(err, student) {
    res.json(student);
  });
});

//CREATE
router.post("/", function(req, res, next) {
  var student = new Student(req.body);
  student.save(function(err, student) {
    if (err) {
      return next(err);
    }
    console.log("added");
    Student.findById(student._id)
      .populate("courses")
      .exec(function(err, student) {
        if (err) {
          return next(err);
        }
        res.status(201);
        res.render("student", {
          students: [student]
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
