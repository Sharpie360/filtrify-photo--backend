// express.js webserver module
const express = require('express');

// handles serverside fetch requests
const fetch = require('node-fetch');

// handles file paths
const path = require('path');

// invoke express app
const app = express();

// host and port env variables and fallbacks
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 1337;



app.get('/', (req, res) => {
  res.json('hello from the filtrify backend')
})

app.get('/filters', (req, res) => {
  res.sendFile(path.join(__dirname, './_mock/', 'filters.json'));
})

app.listen(port);
