// Route handlers
const express = require('express');
const router = express.Router()

//import data models
const Student = require("../models/student");

// RETRIEVE all students
router.get("/", function(req,res){
  Student.find({}, function (err, student_list){
    res.render("students", {students:student_list});
  });
});

module.exports = router;