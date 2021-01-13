const config = require('config');
const express = require('express');

const app = express();

require('./startup/error')();
require('./startup/config')();
require('./startup/db')();
require('./startup/routes')(app);

const port = config.get('port');
const server = app.listen(port, () => console.log(`Connected to localhost:${port}...`));

module.exports = server;
