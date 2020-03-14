import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(3000, (req, res) => {
  console.log('server on port 3000');
});
