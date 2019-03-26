// express.js webserver module
const express = require('express');
// cors modules
const cors = require('cors');
// handles serverside requests
const request = require('request');
// handles url validation @ joshuaferr1s
const isValidUrl = require('url-validation');

// middlewares
const logger = require('./middleware/logger');

// express app
const app = express();

// add cors to api headers
// enables cors for cross-stack comms
app.use(cors());

// request logger
app.use(logger);

// apply CORS headers to the respose 
app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

// validate url and if true, finish request
app.get('*', (req, res) => {
  let url = req.path.substring(1);
  isValidUrl(url) ? req.pipe(request.get(encodeURI(url))).pipe(res) : null;
});

// host and port env variables and fallbacks
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 1337;

app.listen(port, () => console.log(`Server started on port: ${port}`));
