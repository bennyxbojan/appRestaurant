
// init project
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// Establish a connection with the Mongo Database
const mongoDB = ("mongodb+srv://"+
                 process.env.USERNAME+
                 ":"
                 +process.env.PASSWORD+
                 "@"+process.env.HOST+
                 "/"
                 +process.env.DATABASE);
mongoose.connect(mongoDB, {useNewUrlParser: true, retryWrites: true});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load routes
const catalogRouter = require("./routes/catalog");

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.json({"message":"Hello"});
});

app.use("/api/book", catalogRouter);

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
