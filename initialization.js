const express = require('express');
const app = express();
var sql = require('mysql');

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listing on port ${port}!`));
