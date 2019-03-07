
// init project
const express = require('express');
const mongoose = require('mongoose');
const mongo_url = "mongodb+srv://"+process.env.USERNAME+":"+process.env.PASSWORD+"@"+process.env.HOST+"/"+process.env.DATABASE;
//console.log(mongo_url)
mongoose.connect(mongo_url, {useNewUrlParser: true, retryWrites: true});

const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
