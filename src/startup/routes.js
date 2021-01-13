const express = require('express');
const home = require('../routes/home');
const users = require('../routes/users');
const logins = require('../routes/logins');
const posts = require('../routes/posts');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/', home);
    app.use('/api/users', users);
    app.use('/api/logins', logins);
    app.use('/api/posts', posts);
    app.use(error);
}
