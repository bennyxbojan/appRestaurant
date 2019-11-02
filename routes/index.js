// Route handlers
const express = require('express');
const router = express.Router()

//import data models
const Book = require("../models/book");

// RETRIEVE all books
router.get("/", function(req,res){
  Book.find({}, function (err, book_list){
    res.render("index", {books:book_list});
  });
});

module.exports = router;