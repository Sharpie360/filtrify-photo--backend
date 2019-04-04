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



// 3. Initialize Express app
const app = express();

// 3.1. Set up Root route
app.get('/', (req, res) => res.send('Hello from the Filtrify Photo backend. Have fun and enjoy | <3 RabbitWerks.js'));

// 3.2. Set up Favicon catch route
app.get('/favicon', (req, res) => res.sendStatus(204));



// 3.3. Set the App to listen on processEnvironment port or fallback port
const port = process.env.PORT || 1337;

// 3.4 Set the App to Listen on processEnvironment host ip or fallback ip
const host = process.env.HOST || '127.0.0.1';

// 3.5 Start listening on specified port and host (host is a secondary arg)
app.listen(port, host, () => console.log(`Server started at ${host}:${port} Have fun and enjoy! - RabbitWerks.js`));

