const express = require('express');
const cors = require('cors');
const home = require('../routes/home');
const users = require('../routes/users');
const logins = require('../routes/logins');
const posts = require('../routes/posts');
const error = require('../middleware/error');
const logRequest = require('../middleware/logRequest');

module.exports = function (app) {
    app.use(cors());
    app.use(express.json());
    app.use(logRequest);
    app.use('/', home);
    app.use('/api/users', users);
    app.use('/api/logins', logins);
    app.use('/api/posts', posts);
    app.use(error);
}
