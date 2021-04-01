const express = require('express');
const firebase = require('firebase');
const Datastore = require('nedb');

var firebaseConfig = {
    apiKey: "AIzaSyAZ92A2VdvPh78MN453AKHy5vs7QRz7zKk",
    authDomain: "aw-data.firebaseapp.com",
    databaseURL: "https://aw-data-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "aw-data",
    storageBucket: "aw-data.appspot.com",
    messagingSenderId: "114765976712",
    appId: "1:114765976712:web:960c2e7a8a5a9caa757b3d"
  };

firebase.initializeApp(firebaseConfig)
let firebase_database = firebase.database()

const app = express();
const port = process.env.PORT
app.listen(port, () => {
  console.log('Starting server at ${port}')
});
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();
app.post('/api', (request, response) => {
  console.log(request.body);
  const data = request.body;
  const timestamp = Date.now();
  data.tinestamp = timestamp;
  database.insert(data);

  firebase_database.ref("customPath").set(data, function(error) {
      if (error) {
        // The write failed...
        console.log("Failed with error: " + error)
      } else {
        // The write was successful...
        console.log("success")
      }
  });
});
