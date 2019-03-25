// express.js webserver module
const express = require('express');

const cors = require('cors');

// handles serverside fetch requests
const fetch = require('node-fetch');

// handles file paths
const path = require('path');

const logger = require('./middleware/logger')



// invoke express app
const app = express();

app.use(cors());
app.use(logger);
app.use(express.static(path.join(__dirname, '_mock')));


app.get('/', (req, res) => {
  res.json('hello from the filtrify backend')
});

app.get('/filters', (req, res) => {
  res.sendFile(path.join(__dirname, './_mock/', 'filters.json'));
});




// host and port env variables and fallbacks
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 1337;

app.listen(port);
