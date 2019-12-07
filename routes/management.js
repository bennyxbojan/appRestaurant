var express = require("express");
var router = express.Router();
var Restaurant = require("../models/restaurant");

//get all resturants
router.get("/", function(req, res) {
  // if users did not enter a query parameter
  Restaurant.find({}, function(err, restaurants) {
    if (err) {
      res.status(404).render("error", {
        message: err,
        status: 404
      });
    }
    res.status(200).render("manage_rest", {
      restaurants: restaurants
    });
  });
});

//add new restaurants

router.post("/", function(req, res, next) {
  var tables = req.body.tables;
  
  var alltables = []
  tables.forEach(function(table) {
    alltables.push(
      {
        _id:table._id,
        time:table.time,
        taken:table.taken,
        size:table.size
      }
      
      )});
  console.log(alltables);
    
  if (
    req.body.name &&
    req.body.city &&
    req.body.img &&
    req.body.cuisine &&
    req.body.price &&
    req.body.opendays &&
    req.body.tables
  ) {
    var restData = {
      name: req.body.name,
      city: req.body.city,
      zip: req.body.zip,
      img: req.body.img,
      cuisine: req.body.cuisine,
      price: req.body.price,
      opendays: req.body.opendays,
      tables: alltables
    };

    Restaurant.create(restData, function(error, rest) {
      if (error) {
        return next(error);
      } else {
        req.flash("info", "successfully created");
        return res.redirect("/admin");
      }
    });
  } else {
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
});

//update resturant

//delete resturant

module.exports = router;
