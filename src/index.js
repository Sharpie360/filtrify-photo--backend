/* 
  1. Install packages 
    - Express
    - Nodemon
      - Nodemon Script
    - Request
    - URL Validation
*/

// 2. Bring in Express
const express = require('express');
// 6. Bring in Request
const request = require('request');
// 6.1 Bring in URL Validation
const isValidURL = require('url-validation');
// 8.1 Bring in CORS-Adder middleware module
// const corsAdder = require('./middleware/corsAdder');

// 3. Initialize Express app
const app = express();

// 3.1. Set up Root route
app.get('/', (req, res) => res.send('Hello from the Filtrify Photo backend. Have fun and enjoy | <3 RabbitWerks.js'));

// 3.2. Set up Favicon catch route
app.get('/favicon', (req, res) => res.sendStatus(204));

// 4. Set up CORS-Adder middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// 8. Refactor CORS-Adder to middleware module
// app.use(corsAdder);

// 7. Set up Proxyied GET request route
app.get('*', (req, res, next) => {
  // 7.1 pull out URL from request obj. and remove the beginning '/'
  const url = req.path.substring(1)

  // 7.2 Create validation error msg function
  const error = (res) => {
    res.status(500);
    return new Error('Invalid URL provided, please try again.')
  }

  // 7.3 Validate URL
  if (isValidURL(url)) {
    // 7.3.T. Make proxied request and pipe remote response into response obj, listen for errors
    request.get(url).pipe(res)
      .on('error', (error) => next(error));
  } else {
    // 7.3.F. call next with invalid url error
    next(error);
  };

  // 7.4 Refactor into ternary statement
  // isValidURL(url)
  //   // 7.5.T.
  //   ? request.get(url)
  //     .pipe(res)
  //     .on('error', (error) => next(error))
  //   // 7.5.F.
  //   : next(error);
});

// 5. Set up Error Handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: err.message,
    stack: err.stack
  });
});


// 3.3. Set the App to listen on processEnvironment port or fallback port
const port = process.env.PORT || 1337;

// 3.4 Set the App to Listen on processEnvironment host ip or fallback ip
const host = process.env.HOST || '127.0.0.1';

// 3.5 Start listening on specified port and host (host is a secondary arg)
app.listen(port, host, () => console.log(`Server started at ${host}:${port} Have fun and enjoy! | <3 RabbitWerks.js`));

