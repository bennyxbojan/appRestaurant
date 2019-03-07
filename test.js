#! /usr/bin/env node




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
