var express = require("express");
var router = express.Router();
// const auth = require('./auth');
var User = require("../models/user");


function checkClient(req, res,next){
   if(req.session.userID){
     if (req.session.role == 'client'){
       next();     //If session exists, proceed to page
     }
   } else {
      var err = new Error("You must be logged into see this page");
      next(err);  //Error, trying to access unauthorized page!
   }
}

function checkAdmin(req, res,next){
     if(req.session.userID){
     if (req.session.role == 'admin'){
       next();     //If session exists, proceed to page
     }
   } else {
      var err = new Error("You must be logged into see this page");
      next(err);  //Error, trying to access unauthorized page!
   }
}

// GET route for reading data
router.get("/", function(req, res, next) {
  res.status(200).render("login");
});

//POST route for updating data
router.post("/", function(req, res, next) {

  if (
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordRe
  ) {
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      role: 'client'
    };

    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.username = user.username;
        console.log(req.session.username);
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
          req.session.userId = user._id;
          req.session.role = user.role;
          return res.redirect("/login/profile");
        } else if (user.auth == "admin") {
          req.session.userId = user._id;
          req.session.role = user.role;
          return res.redirect("/login/admin");
        }
      }
    });
  } else {
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
});

// GET route after registering
router.get("/profile", checkClient, function(req, res, next) {
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

router.get("/admin", checkAdmin, function(req, res, next) {
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
          "<h1>Admin Page</h1>" +
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
