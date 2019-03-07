const express = require('express');
const router = express.Router()



//import data models
const Book = require("../models/book.js");

router.get("/", function(req,res, next){
  
  Book.find({}, 'title author')
  .populate('author')
  .exec(function (err, book_list){
    if (err) {return next(err);}
    res.json(book_list);
  }
});

module.exports = router;