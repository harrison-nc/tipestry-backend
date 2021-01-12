const config = require('config');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

require('./startup/routes')(app);

const db = 'mongodb://localhost/tipestry';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};
mongoose.connect(db, options)
    .then(() => console.log(`Connected to db ${db}...`))
    .catch(() => console.log(`Failed to connect to db ${db}`));

const port = config.get('port');
const server = app.listen(port, () => console.log(`Connected to localhost:${port}...`));

module.exports = server;
