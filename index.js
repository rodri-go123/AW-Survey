const express = require('express');
const Datastore = require('nedb');
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
});
