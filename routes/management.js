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

router.post("/", function(req,res){
            
})


//update resturant



//delete resturant


module.exports = router;