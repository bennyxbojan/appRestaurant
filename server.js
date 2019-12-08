 console.log("In server.js!");

// init project
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const bodyParser = require('body-parser');
const session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const errorHandler = require('errorhandler');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash'); 
const passport = require('passport'); 


//start express
const app = express();

// Establish a connection with the Mongo Database
// Get the username, password, host, and databse from the .env file
const mongoDB = ("mongodb+srv://"+
                 process.env.USERNAME+
                 ":"
                 +process.env.PASSWORD+
                 "@"
                 +process.env.HOST+
                 "/"
                 +process.env.DATABASE);
// console.log("Connection String: "+mongoDB);

mongoose.connect(mongoDB, {useNewUrlParser: true, retryWrites: true});

//debugging 
mongoose.connection.on('connected', function (){
  console.log('Mongoose connected to '+process.env.DATABASE);
});

mongoose.connection.on('error', function (err){
  console.log('Mongoose connection error: '+err);
});

mongoose.connection.on('disconnected', function (){
  console.log('Mongoose disconnected.');
});


//use sessions for tracking logins
app.use(session({
  secret: 'final project',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    autoRemove:'native'
  })
}));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(flash());

// set the view engine
app.set("view engine", "ejs")
app.set("views", __dirname + "/views/");
app.engine("html", require("ejs").renderFile);

app.use(express.static("public"));


// Load routes
const loginRouter = require("./routes/login");
const searchRouter = require("./routes/search");
const indexRouter = require("./routes/index");
const adminRouter = require("./routes/management");
const orderRouter = require("./routes/order");

app.use(function(req, res, next) {
  res.locals.curUser = req.session.username;
  next();
});

// GET for logout
app.use("/logout", function(req, res, next) {
  if (req.session) {
    // delete session object
    req.flash("info", "Successfully logged out");
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        res.redirect("/");
      }
    });
  }
});

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/search",searchRouter);
app.use("/manage", adminRouter);
app.use("/neworder", orderRouter);


// const Table = require("./models/table");

// app.get("/test",function(req,res){
//   Table.find({},function(error,tables){
//     if (error){
//       res.send(error)
//     }else{
//       res.send(tables)
//     }
//   })
// });

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
