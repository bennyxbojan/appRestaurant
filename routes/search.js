var express = require("express");
var router = express.Router();
var Restaurant = require("../models/restaurant");

// GET route for reading data
router.get("/", function(req, res, next) {
  if (req.body.date && req.body.time && req.body.guest && req.body.city) {
    var date = new Date(req.body.date);
    var weekday = date.getDay();
    
    
    
    
  }else{
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
  
});

//POST route for updating data
router.post("/", function(req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordRe) {
    var err = new Error("Passwords do not match.");
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordRe
  ) {
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    };

    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect("/profile");
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
        req.session.userId = user._id;
        return res.redirect("/login/profile");
      }
    });
  } else {
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
});

// GET route after registering
router.get("/profile", function(req, res, next) {
  User.findById(req.session.userId).exec(function(error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        var err = new Error("Not authorized! Go back!");
        err.status = 400;
        return next(err);
      } else {
        return res.send(
          "<h1>Name: </h1>" +
            user.username +
            "<h2>Mail: </h2>" +
            user.email +
            '<br><a type="button" href="/login/logout">Logout</a>'
        );
      }
    }
  });
});

// GET for logout
router.get("/logout", function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
});

module.exports = router;
