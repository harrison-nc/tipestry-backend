const express = require('express');

const home = require('./routes/home');

const app = express();

app.use('/', home);

const server = app.listen(3000, () => console.log('Connected to localhost:3000...'));

module.exports = server;
