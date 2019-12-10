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
    res.render("error", {
      status:401,
      message:"You don't have access to this page",
      redirect: '/login'
    })
  }
}
 
function getOrderNum() {
  return Math.round(Math.random() * 10000000);
}

//console.log(getOrderNum());

router.get("/review", checkClient, function(req, res, next) {
  if (req.query) {
    Restaurant.findById(req.query.restID, function(err, rest) {
      if (err) {
        res.status(err.errors.code).render("error", {
              status: err.errors.code,
              message: err.message,
              redirect:'/manage'
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
                // console.log(table);
                // console.log(user);
                res.render("review", {
                  rest: rest,
                  user: user,
                  table: table,
                  date: req.query.date,
                  guest: req.query.guest
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

// router.get("/test", checkClient, function(req, res, next) {
//   //options: { $elemMatch: { table: req.query.tableID } } };
//   Restaurant.findById(req.query.restID, function(err, rest) {
//     if (err) {
//       return next(err);
//     } else {
//       console.log(rest.options.length);

//       console.log(rest.options[0].table == req.query.tableID);
//       for (let i = 0; i < rest.options.length; i++){
//         if (rest.options[i].table == req.query.tableID){
//           rest.options[i].taken = true;
//         res.send(rest.options[i].taken);
//         }
//       }
//     }

//   });
// });

// router.get("/test", checkClient, function(req, res, next) {
//   //options: { $elemMatch: { table: req.query.tableID } } };
//   Restaurant.findById(req.query.restID, function(err, rest) {
//     var index = 0;
//     if (err) {
//       return next(err);
//     } else {
//       // console.log(rest.options.length);

//       //console.log(rest.options[0].table == req.query.tableID);
//       for (let i = 0; i < rest.options.length; i++) {
//         if (rest.options[i].table == req.query.tableID) {
//           index = i;
//           console.log(rest.options[index].taken);
//         }
//       }
//     }
//     //     Restaurant.findByIdAndUpdate(req.query.restID, {$set: {'options[index].taken': true}}),function(err,rest){
//     //       if(err){
//     //         return next(err)
//     //       }else{
//     //         console.log(rest);
//     //         res.send(rest)
//     //       }
//     //     }

//     //   });
 
//     var ok="okay";
//     Restaurant.update(
//       { _id: req.query.restID, "options.table": req.query.tableID },
//       {
//         $set: {
//           "options.$.taken": true
//         }
//       },function(err){
//         if(err){
//           return next(err);
//         }else{
//           res.send(ok);
//         }
//       }
//     );
//   });
// });

//submit a new order
router.post("/", checkClient, function(req, res, next) {
  let filter = { options: { $elemMatch: { table: req.body.tableID } } };
  let update = { options: { taken: true } };

  // Restaurant.findOneAndUpdate(filter, update, function(err){
  //   return next(err)
  // });

  var order = {
    orderNum: getOrderNum(),
    userID: req.session.userID,
    restID: req.body.restID,
    date: req.body.date,
    guest: req.body.guest,
    guestname: req.body.guestname,
    table: req.body.tableID
  };
  Order.create(order, function(error, order) {
    if (error) {
      return next(error);
    } else {
      //should redirect to "Congrats! Successfully!"
      Restaurant.update(
        { _id: req.body.restID, "options.table": req.body.tableID },
        { 
          $set: {
            "options.$.taken": true
          }
        },
        function(err) {
          if (err) {
            return next(err);
          } else {
            console.log("update success");
          }
        }
      );
      return res.redirect("/login/profile");
    }
  });
});

module.exports = router;
