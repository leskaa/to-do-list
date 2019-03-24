// ./app.js
const express = require('express');
const mountRoutes = require('./routes');

const app = express();
mountRoutes(app);

// ... more express setup stuff can follow
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (req, res) => {
  response.json({ info: 'to-do-list API' });
});

app.listen(port, () => {
  console.log(`App running on port: ${port}.`);
});
