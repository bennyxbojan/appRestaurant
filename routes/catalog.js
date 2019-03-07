const express = require('express');
const router = express.Router()

//import data models
const Book = require("../models/book");

router.get("/", function(req,res, next){
  
  Book.find({},)
  .exec(function (err, book_list){
    if (err) {return next(err);}
    res.json(book_list);
  });
});



module.exports = router;