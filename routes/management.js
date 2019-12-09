var express = require("express");
var router = express.Router();
var Restaurant = require("../models/restaurant");
var User = require("../models/user");
var Order = require("../models/order");

function checkAdmin(req, res, next) {
  if (req.session.userID) {
    console.log(req.session.role);
    if (req.session.role == "admin") {
      next(); //If session exists, proceed to page
    }
  } else {
    var err = new Error("You don't have access to this page");
    next(err); //Error, trying to access unauthorized page!
    res.redirect("/login");
  }
}
//get all restaurants
router.get("/", checkAdmin, function(req, res, next) {
  User.findOne({ _id: req.session.userID }).exec(function(err, user) {
    if (!req.query.restname) {
      Restaurant.find({})
        .sort("name")
        .exec(function(err, restaurants) {
          if (err) {
            return next(err);
          } else {
            res.status(200).render("manageRest", {
              restaurants: restaurants,
              name: user.fname,
              email: user.email
            });
          }
        });
    } else {
      Restaurant.find({ name: { "$regex": req.query.restname,"$options": "i"}})
        .sort("name")
        .exec(function(err, restaurants) {
          if (err) {
            return next(err);
          } else {
            res.status(200).render("manageRest", {
              restaurants: restaurants,
              name: user.fname,
              email: user.email
            });
          }
        });
    }
  });
});

// enter the create new object page
router.get("/newrest", checkAdmin, function(req, res, next) {
  User.findOne({ _id: req.session.userID }).exec(function(error, user) {
    Restaurant.find({}, function(err, restaurants) {
      if (err) {
        err.status = 404;
        return next(err);
      }
      res.status(200).render("insertNew");
    });
  });
});

//add new restaurants
router.post("/newrest", function(req, res, next) {
  var options = req.body.options;
  // console.log(options);
  // var alltables = [];
  // options.forEach(function(one) {
  //   alltables.push({
  //     table: one.table,
  //     taken: one.taken,
  //   });
  // });
  // console.log(alltables);
  console.log(req.body);
  var data = JSON.parse(req.body);
  console.log(data);
  if (
    req.body.name &&
    req.body.city &&
    req.body.contact &&
    req.body.zip &&
    req.body.address &&
    req.body.img &&
    req.body.cuisine &&
    req.body.price &&
    req.body.opendays &&
    req.body.options
  ) {
    var restData = {
      name: req.body.name,
      city: req.body.city,
      zip: req.body.zip,
      contact: req.body.contact,
      address: req.body.address,
      img: req.body.img,
      cuisine: req.body.cuisine,
      price: req.body.price,
      opendays: req.body.opendays,
      options: options
    };

    Restaurant.create(restData, function(error, rest) {
      if (error) {
        return next(error);
      } else {
        req.flash("info", "successfully created");
        return res.redirect("/manage");
      }
    });
  } else {
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
});

//update resturant
router.put("/editrest", function(req, res, next) {
  var update = req.body;

  Restaurant.findByIdAndUpdate(update._id, update, function(err, rest) {
    if (err) {
      return next(err);
    } else {
      res.render("manageRest");
    }
  });
});

//delete resturant

router.delete("/delrest", function(req, res, next) {
  Restaurant.findOneAndRemove({ _id: req.query.restID }, function(err, rest) {
    rest.remove(function(err) {
      if (err) {
        return next(err);
      } else {
        res.render("manageRest");
      }
    });
  });
});

//get all orders
router.get("/orders", checkAdmin, function(req, res, next) {
  User.findOne({ _id: req.session.userID }).exec(function(error, user) {
    if()
    Order.find({})
      .populate("restID")
      .populate("tableID")
      .populate("userID")
      .exec(function(err, orders) {
        if (err) {
          return next(err);
        } else {
          console.log(orders);
          res.status(200).render("manageOrder", {
            orders: orders,
            name: user.fname,
            email: user.email
          });
        }
      });
  });
});

module.exports = router;
