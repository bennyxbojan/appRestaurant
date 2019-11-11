// Route handlers
const express = require('express');
const router = express.Router()

//import data models
const Student = require("../models/student");
const Class = require("../models/student");

// RETREIVE all books
router.get("/", function(req,res){
  Student.find({}, function (err, allStudents){
    res.json(allStudents);
  });
});

// RETRIEVE a specific book
router.get("/:studentId", function(req, res){
  Student.findById(req.params.studentId, function(err, student) {
    res.json(student)
  });
});

//CREATE
router.post('/', function(req, res){
  let student = new Student(req.body);
  var gpa = student.gpa;
  var courses = student.courses;
  //check gpa validity
  if (gpa > 4 | gpa < 0 ){
    res.status(401).render("error", {
        message: "Bad Request. Please provide a valid gpa number (0.00-4.00).",
        status: 400
  })
  };
  //check course validity
  for (var i = 0; i < courses.length; i++) {
    Class.find({ courseNum: courses[i] }, function(err, course) {
      console.log(course);
      if (err) {
        res.status(400).send(err);
      }
      if(course.length == 0){
        res.status(400).send({
          message: "Course Number Not Found! Please input a valid course id."
        });
      }
    });
  
  student.save();
  res.status(201).send(student);
});

//UPDATE
router.put("/:bookId", function(req, res) {
  Book.findById(req.params.bookId, function(err, book) {
    book.title = req.body.title;
    book.author = req.body.author;
    book.rating = req.body.title;
    book.save();
    res.json(book);
  });
});

//DELETE
router.delete("/:bookId", function(req, res){
  Book.findById(req.params.bookId, function(err, book) {
    book.remove(function(err){
        if(err){
          res.status(500).send(err);
        }
        else{
          res.status(204).send('removed');
        }
    });
  });
});
module.exports = router;