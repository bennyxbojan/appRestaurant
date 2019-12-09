var express = require("express");
var router = express.Router();
// const auth = require('./auth');
var User = require("../models/user");
var Order = require("../models/order");



function checkClient(req, res, next) {
  if (req.session.userID) {
    next(); //If session exists, proceed to page
  } else {
    var err = new Error("You must be logged into see this page");
    next(err); //Error, trying to access unauthorized page!
    res.redirect("/login");
  }    
}

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

// GET route for reading data
router.get("/", function(req, res, next) {
  res.status(200).render("login");
});

//POST route for updating data
router.post("/", function(req, res, next) {
  if (
    req.body.fname &&
    req.body.lname &&
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordRe
  ) {
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      fname:req.body.fname,
      lname:req.body.lname,
      role: "client"
    };

    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userID = user._id;
        req.session.role = user.role;
        req.session.username = user.fname;
        return res.redirect("/login/profile");
      }
    });
  } else if (req.body.logusername && req.body.logpassword) {
    User.authenticate(req.body.logusername, req.body.logpassword, function(
      error,
      user
    ) {
      if (error || !user) {
        var err = new Error("Wrong username or password.");
        err.status = 401;
        return next(err);
      } else {
        if (user.role == "client") {
          req.session.userID = user._id;
          req.session.role = user.role;
          req.session.username = user.fname;
          // console.log(req.session.userID);
          return res.redirect("/login/profile");
        } else if (user.role == "admin") {
          req.session.userID = user._id;
          req.session.role = user.role;
          req.session.username = user.fname;
          // console.log(req.session.userID);
          // console.log(req.session.role);
          return res.redirect("/manage");
        }
      }
    });
  } else {
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
});


// Client profile page
router.get("/profile", checkClient, function(req, res, next) {
  // console.log(req.session.userID);
  User.findById(req.session.userID).exec(function(error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        var err = new Error("Not authorized! Go back!");
        err.status = 400;
        return next(err);
      } else {
        Order.find({ userID: req.session.userID })
          .populate("restID")
          .populate("restID.options")
          .populate("tableID")

        .exec(function( 
          error,
          orders
        ) {
          console.log(orders);
          return res.render("profile", {
            orders: orders,
            user: user.fname,
            email: user.email
            // '<br><a type="button" href="/logout">Logout</a>'
          });
        });
      }
    }
  });
});

module.exports = router;
