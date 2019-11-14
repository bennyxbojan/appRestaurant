// Route handlers
const express = require('express');
const router = express.Router()

//import data models
const Student = require("../models/student");

//default link redirect to index html page
router.get("/", function(req, res) {
  res.status(200).render("../public/index.html");
});

module.exports = router;