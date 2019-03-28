// express.js webserver module
const express = require('express');
// handles serverside http requests
const request = require('request');
// handles url validation @ joshuaferr1s
const isValidUrl = require('url-validation');

// middleware
const corsAdder = require('./middleware/corsAdder');

// corrects the / removal in the proxied http[://]
const repairURI = (uri) => {
  if (uri.includes(':/') && !uri.includes('://')) {
    // takes the [http] part and adds [:/] to it, then merges that with the [/rest-of-the-url.com/some-cool-image] 
    return `${uri.split(':')[0]}:/${uri.split(':')[1]}`;
  }
  return uri;
};

// express app
const app = express();

// apply CORS headers to any request that hits the api
app.use(corsAdder);

// handles the root route response
app.get('/', (req, res) => res.json('Welcome to the Filtrify Photo backend.'));

// handles status response for favicon (auto requested)
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// repair url, then validate and if true, finish request
app.get('*', (req, res, next) => {
  let url = repairURI(req.path.substring(1));

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
app.listen(port, host, () => console.log(`Server started on port: ${host}:${port}`));
