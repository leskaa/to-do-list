// ./app.js
const express = require('express');
const mountRoutes = require('./routes');
const bodyParser = require('body-parser');

const app = express();

// ... more express setup stuff can follow
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

mountRoutes(app);

app.get('/api', (req, res) => {
  res.json({ info: 'to-do-list API' });
});

const port = process.env.PORT || 3000;
// const host = 'localhost';

app.listen(port, () => {
  console.log(`App running on port: ${port}.`);
});
