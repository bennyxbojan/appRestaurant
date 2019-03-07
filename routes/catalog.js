const express = require('express');
const router = express.Router()



//import data models
const Book = require("../models/book");
const Author = require("../models/author");

router.get("/", function(req,res, next){
  
  Book.find({},)
  .populate('author')
  .exec(function (err, book_list){
    if (err) {return next(err);}
    res.json(book_list);
  });
});

module.exports = router;