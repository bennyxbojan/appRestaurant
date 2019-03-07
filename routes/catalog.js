const express = require('express');
const router = express.Router()

//import data models
const Book = require("../models/book");

// READ
router.get("/", function(req,res){
  
  Book.find({}, function (err, book_list){
    res.json(book_list);
  });
});

// READ
router.get("/:bookId", function(req, res){
  Book.findById(req.params.bookId, function(err, book) {
    res.json(book)
  });
});

//CREATE
router.post('/', function(req, res){
  let book = new Book(req.body);
  book.save();
  res.status(201).send(book);
});

//UPDATE
router.put("/:bookId", function(req, res) {
  Book.findById(req.params.bookId, function(err, book) {
    book.title = req.body.title;
    book.author = req.body.author;
    book.save();
    res.json(book);
  });
});

//DELETE
router.delete("/:bookId", function(req, res){
  Book.findById(req.params.bookId, (err, book) => {
    book.remove(err => {
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