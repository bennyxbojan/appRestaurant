// Route handlers
const express = require('express');
const router = express.Router()

//import data models
const Book = require("../models/student");

// RETRIEVE all classes
router.get("/", function(req,res){
  Book.find({}, function (err, class_list){
    res.render("index", {books:book_list});
  });
});

module.exports = router;