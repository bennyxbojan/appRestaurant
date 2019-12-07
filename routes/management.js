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
      resturants: restaurants
    });
  });
});

//add new restaurants

router.post("/", function(req, res, next) {
  console.log(req.body.tables[0]._id)
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
      tables: {
        _id: req.body.tables._id,
        time: req.body.tables.time,
        taken: req.body.tables.taken,
        size: req.body.tables.size
      }
    };

    Restaurant.create(restData, function(error, rest) {
      if (error) {
        return next(error);
      } else {
        res.render("manage_rest", {
          message: "okay"
        });
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
