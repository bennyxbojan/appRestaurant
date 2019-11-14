 console.log("In server.js!");

// init project
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const bodyParser = require('body-parser');

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

//start express 
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine
app.set("view engine", "ejs")
app.set("views", __dirname + "/views/");
app.engine("html", require("ejs").renderFile);

app.use(express.static("public"));

// Load routes
const indexRouter = require("./routes/index");
const studentRouter = require("./routes/student");
const classRouter = require("./routes/class");

//get all database record
app.get("/list", async function(req, res) {
  let fashions;
  let tags;
  
  await fashionItem.find({}, function(err,fashionList){
    fashions = fashionList;
  });
  await fashionTags.find({},function(err,tagList){
    console.log(tagList);
    tags = tagList;
  });
  res.render("list",{
    fashions:fashions,
    tags:tags
  });
});


app.use("/", indexRouter);
app.use("/student", studentRouter);
app.use("/class", classRouter);





// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
