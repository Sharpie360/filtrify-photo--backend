// express.js webserver module
const express = require('express');
// enables cors for cross-stack comms
const cors = require('cors');
// handles serverside requests
const request = require('request');

// handles file paths and mock data
const path = require('path');
const _filterData = require('./_mock/_filterData');

// middlewares
const logger = require('./middleware/logger');



// express app
const app = express();

app.use(cors());
app.use(logger);


app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

// // root route
// app.get('/', (req, res) => {
//   res.json('hello from the filtrify backend');
// });


// // demo routes for mock data
// app.get('/api/filters', (req, res) => {
//   res.sendFile(path.join(__dirname, './_mock/', 'filters.json'));
// });
// app.get('/api/filters/:id', (req, res) => {
//   const _id = req.params.id;
//   res.json(_filterData[_id]);
// });


app.get('*', (req, res) => {
  let url = req.path.substring(1);
  console.log(url)
  req.pipe(request.get(encodeURI(url))).pipe(res);
});

// host and port env variables and fallbacks
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 1337;

app.listen(port);
