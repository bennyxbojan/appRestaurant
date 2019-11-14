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
        res.status(500).render("error", {
          message: err,
          status: 500
        });
      } else {
        //print all student records ==> confirm the record is del
        Student.find({})
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
      res.status(500).render("error", {
        message: err,
        status: 500
      });
    }
    Student.find({ studentID: student.studentID })
      .populate("classes")
      .exec(function(err, student) {
        if (err) {
          res.status(404).render("error", {
            message: err,
            status: 404
          });
        }
        res.status(201).render("students", {
          students: student
        });
      });
  });
});

//UPDATE
router.put("/:studentId", function(req, res) {
  var updated = req.body;
  Student.findOneAndUpdate(
    { studentID: req.params.studentId },
    req.body,
    function(err, student) {
      if (err) {
        res.status(500).render("error", {
          message: err,
          status: 500
        });
      } else {
        //print this student's records ==> confirm the record is updated
        Student.find({ studentID: student.studentID })
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
    }
  );
});

//udpate many -- delete students under a given gpa
router.put("/udpate/:gpa", function(req, res) {
  Student.deleteMany({ gpa: { $lt: req.params.gpa } }, function(err) {
    if (err) {
      res.status(400).render("error", {
        message: err,
        status: 400
      });
    } else {
      Student.find({})
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

module.exports = router;
