
// init project
const express = require('express');
const mongoose = require('mongoose');
const mongoDB = "mongodb+srv://"+process.env.USERNAME+":"+process.env.PASSWORD+"@"+process.env.HOST+"/"+process.env.DATABASE;
//console.log(mongo_url)
mongoose.connect(mongoDB, {useNewUrlParser: true, retryWrites: true});

const app = express();

const catalogRouter = require("./routes/catalog");



// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.json({"message":"Hello"});
});

app.use("/api/books", catalogRouter);

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
