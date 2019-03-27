// express.js webserver module
const express = require('express');
// handles serverside http requests
const request = require('request');
// handles url validation @ joshuaferr1s
const isValidUrl = require('url-validation');

// express app
const app = express();

// apply CORS headers to any reuqest that hits the api
app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

// handles status response for favicon (auto requested)
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// validate url and if true, finish request
app.get('*', (req, res, next) => {
  let url = req.path.substring(1);
  
  // create new error for invalid url
  const error = (res) => {
    res.status(500);
    return new Error('Invalid URL');
  }

  // check if valid URL
  isValidUrl(url)
    // if true make GET request to URL
    ? request.get(url)
        // pipe response into response object
        .pipe(res)
        // throw an error if error from remote asset
        .on('error', (error) => next(error))
    // if false skip and pass error to next
    : next(error);
});

// middleware for error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

// host and port env variables and fallbacks
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 1337;

// starts the server on provided HOST / PORT or fallbacks
app.listen(port, host, () => console.log(`Server started on port: ${port}`));
