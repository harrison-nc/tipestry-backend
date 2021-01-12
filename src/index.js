const config = require('config');
const express = require('express');
const app = express();
app.use(express.json());

const home = require('./routes/home');
const users = require('./routes/users');

app.use('/', home);
app.use('/api/users', users);

const port = config.get('port');
const server = app.listen(port, () => console.log(`Connected to localhost:${port}...`));

module.exports = server;
