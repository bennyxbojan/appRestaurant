var express = require("express");
var router = express.Router();
var Restaurant = require("../models/restaurant");
var User = require("../models/user");

function checkAdmin(req, res, next) {
  if (req.session.userID) {
    console.log(req.session.role);
    if (req.session.role == "admin") {
      next(); //If session exists, proceed to page
    }
  } else {
    var err = new Error("You don't have access to this page");
    next(err); //Error, trying to access unauthorized page!
  }
}

router.get("/", checkAdmin, function(req, res, next) {
  User.findOne({ _id: req.session.userID }).exec(function(error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        var err = new Error("Not authorized! Go back!");
        err.status = 400;
        return next(err);
      } else {
        Restaurant.find({}, function(err, restaurants) {
          if (err) {
            res.status(404).render("error", {
              message: err,
              status: 404
            });
          }
          res.status(200).render("manageRest", {
            restaurants: restaurants,
            name: user.username,
            email: user.email
          });
        });
      }
    }
  });
});

//add new restaurants

router.post("/", function(req, res, next) {
  var tables = req.body.tables;

  var alltables = [];
  tables.forEach(function(table) {
    alltables.push({
      _id: table._id,
      time: table.time,
      taken: table.taken,
      size: table.size
    });
  });
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
