// Route handlers
const express = require("express");
const router = express.Router();

//import data models
// const Student = require("../models/student");
// const Class = require("../models/class");
//default link redirect to index html page

var today = new Date();
var dd = ("0" + today.getDate()).slice(-2);
var mm = ("0" + (today.getMonth() + 1)).slice(-2);
var yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;

router.get("/", function(req, res) {
  res.status(200);
  res.render("index",{
    date:today  
  })
}); 

//get all database record
router.get("/list", async function(req, res) {
  var students;
  var classes;

//   await Student.find({}, function(err, s) {
//     if (err) {
//       res.status(404).render("error", {
//         message: err,
//         status: 404
//       });
//     } else {
//       students = s;
//     }
//   });
  
//   await Class.find({}, function(err, c) {
//     if (err) {
//       res.status(404).render("error", {
//         message: err,
//         status: 404
//       });
//     } else {
//       classes = c;
//     }
//   });
//   res.status(200).render("list", {
//     students: students,
//     classes: classes
//   });
});

module.exports = router;
