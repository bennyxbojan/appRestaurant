var express = require("express");
var router = express.Router();
var Restaurant = require("../models/restaurant");
var User = require("../models/user");
var Order = require("../models/order");
var Table = require("../models/table");

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
              query: "Restaurant",
              restaurants: restaurants,
              name: user.fname,
              email: user.email
            });
          }
        });
    } else {
      Restaurant.find({ name: { $regex: req.query.restname, $options: "i" } })
        .sort("name")
        .exec(function(err, restaurants) {
          if (err) {
            return next(err);
          } else {
            res.status(200).render("manageRest", {
              query: req.query.restname,
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
  // console.log(options);
  // var alltables = [];
  // options.forEach(function(one) {
  //   alltables.push({
  //     table: one.table,
  //     taken: one.taken,
  //   });
  // });
  // console.log(alltables);
  //console.log(req.body);
  var data = req.body.Rest["0"];

  var tables = [];

  //if all fields
  if (
    data.name &&
    data.city &&
    data.contact &&
    data.zip &&
    data.address &&
    data.img &&
    data.cuisine &&
    data.price &&
    data.opendays &&
    data.options
  ) {
    //find the table id with time+size
    for (var i = 0; i < data.options.length; i++) {
      var time = data.options[i].time;
      var size = data.options[i].size;
      Table.find({
        time: time,
        size: size
      }).exec(function(err, table) {
        if (err) {
          return err;
        } else {
          console.log(table);
          tables.push({
            table: table[0]._id,
            taken: false
          });

          console.log(tables);

          var restData = {
            name: data.name,
            city: data.city,
            zip: data.zip,
            contact: data.contact,
            address: data.address,
            img: data.img,
            cuisine: data.cuisine,
            price: data.price,
            opendays: data.opendays,
            options: tables
          };
          User.findOne({ _id: req.session.userID }).exec(function(error, user) {
            Restaurant.create(restData, function(error, rest) {
              if (error) {
                return next(error);
              } else {
                return res.redirect("/manage");
              }
            });
          });
        }
      });
    }
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

router.get("/delrest", function(req, res, next) {
  User.findOne({ _id: req.session.userID }).exec(function(error, user) {
    Restaurant.findOneAndRemove({ _id: req.query.restID }, function(err, rest) {
      rest.remove(function(err) {
        if (err) {
          return next(err);
        } else {
          res.render("manageRest", {
            name: user.fname,
            email: user.email
          });
        }
      });
    });
  });
});

//get all orders
router.get("/orders", checkAdmin, function(req, res, next) {
  User.findOne({ _id: req.session.userID }).exec(function(error, user) {
    if (!req.query.orderNum) {
      Order.find({})
        .sort({ date: -1 })
        .populate("restID")
        .populate("tableID")
        .populate("userID")
        .exec(function(err, orders) {
          if (err) {
            return next(err);
          } else {
            console.log(orders);
            res.status(200).render("manageOrder", {
              query: "OrderNum",
              orders: orders,
              name: user.fname,
              email: user.email
            });
          }
        });
    } else {
      Order.find({ orderNum: req.query.orderNum })
        .sort({ date: -1 })
        .populate("restID")
        .populate("tableID")
        .populate("userID")
        .exec(function(err, orders) {
          if (err) {
            return next(err);
          } else {
            console.log(orders);
            res.status(200).render("manageOrder", {
              query: req.query.orderNum,
              orders: orders,
              name: user.fname,
              email: user.email
            });
          }
        });
    }
  });
});

module.exports = router;
