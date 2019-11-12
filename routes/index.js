// Route handlers
const express = require('express');
const router = express.Router()

//import data models
const Book = require("../models/student");

// RETRIEVE all books
router.get("/", function(req,res){
  Book.find({}, function (err, student_list){
    res.render("students", {students:student_list});
  });
});

module.exports = router;