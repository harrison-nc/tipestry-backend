const config = require('config');
const express = require('express');
const app = express();

const home = require('./routes/home');

app.use('/', home);

const port = config.get('port');
const server = app.listen(port, () => console.log(`Connected to localhost:${port}...`));

module.exports = server;
