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
      resturants:restaurants
    });
  });
});

//add new restaurants

// router.post("/", function(req,res,next){
//   if (
//     req.body.name &&
//     req.body.city &&
//     req.body.image
//   ) {
//     var userData = {
//       email: req.body.email,
//       username: req.body.username,
//       password: req.body.password,
//       role: "client"
//     };

//     User.create(userData, function(error, user) {
//       if (error) {
//         return next(error);
//       } else {
//         req.session.userID = user._id;
//         req.session.role=user.role;
//         return res.redirect("/login/profile");
//       }
//     });  
//   }
// })


//update resturant



//delete resturant


module.exports = router;