var express = require("express");
var router = express.Router();
// const auth = require('./auth');
var User = require("../models/user");
var Order = require("../models/order");
var Table = require("../models/table");
var Restaurant = require("../models/restaurant");

function checkClient(req, res, next) {
  if (req.session.userID) {
    next(); //If session exists, proceed to page
  } else {
    var err = new Error("You must be logged into see this page");
    next(err); //Error, trying to access unauthorized page!
    res.redirect('/login');
  }
}

router.get("/review", checkClient, function(req, res, next) {
  if (req.query) {
    Restaurant.findById(req.query.restID, function(err, rest) {
      if (err) {
        return next(err);
      } else {
        User.findById(req.session.userID, function(err, user) {
          if (err) {
            return next(err);
          } else {
            Table.findById(req.query.tableID, function(err, table) {
              if (err) {
                return next(err);
              } else {
                console.log(rest);
                console.log(table);
                console.log(user);
                res.render("review", {
                  rest: rest,
                  user: user,
                  table: table,
                  date: req.query.date,
                  guest:req.query.guest
                });
              }
            });
          }
        });
      }
    });
  } else {
    var err = new Error("Something's wrong! Please try again");
    next(err); //Error, trying to access unauthorized page!
  }
});

router.post("/", checkClient, function(req, res, next) {
  var tableinfo = req.body.table;
  var tableid;

  Table.find({ time: tableinfo.time, size: tableinfo.size }, function(
    err,
    table
  ) {
    if (err) {
      return next(err);
    } else {
      tableid = table._id;
    }
  });

  let filter = { options: { $elemMatch: { table: tableid } } };
  let update = { options: { taken: true } };

  Restaurant.findOneAndUpdate(filter, update);

  var order = {
    userID: req.session.userID,
    restID: req.body.restID,
    date: req.body.date,
    guest: req.body.guest,
    table: tableid
  };
  Order.create(order, function(error, order) {
    if (error) {
      return next(error);
    } else {
      //should redirect to "Congrats! Successfully!"
      return res.redirect("/login/profile");
    }
  });
});

module.exports = router;
