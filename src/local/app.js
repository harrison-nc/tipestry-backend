const express = require('express');
const app = express();

require('../startup/error')();
require('../startup/config')();
require('../startup/db')();
require('../startup/validation')();
require('../startup/routes')(app);

module.exports = app;
