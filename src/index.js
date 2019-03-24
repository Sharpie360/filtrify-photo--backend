import express from 'express';

const app = express();

const port = 1337;

app.get('/', (req, res) => {
  res.json('hello from the filtrify backend')
})

app.listen(1337)
