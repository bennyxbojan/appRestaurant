
// init project
const express = require('express');
// const mongoose = require('mongoose');
// const mongo_url = "mongodb+srv://"+process.env.USERNAME+":"+process.env.PASSWORD+"@"+process.env.HOST+"/"+process.env.DATABASE;
// //console.log(mongo_url)
// mongoose.connect(mongo_url, {useNewUrlParser: true, retryWrites: true});


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://librarian:hZg5af1x6S8UuVcL@infsci2560-spring19-midgh.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  if (err){
    console.log("Error");
    console.log(err);
  }
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


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
