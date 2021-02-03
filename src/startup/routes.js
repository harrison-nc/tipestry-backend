const config = require('config');
const express = require('express');
const cors = require('cors');
const home = require('../routes/home');
const users = require('../routes/users');
const logins = require('../routes/logins');
const posts = require('../routes/posts');
const error = require('../middleware/error');
const logRequest = require('../middleware/logRequest');

const postApi = config.get('api_post');
const userApi = config.get('api_user');
const loginApi = config.get('api_login');
const homeApi = config.get('api_home');

module.exports = function (app) {
    app.use(logRequest);
    app.use(express.static('public'));
    app.use(cors());
    app.use(express.json());
    app.use(homeApi, home);
    app.use(userApi, users);
    app.use(loginApi, logins);
    app.use(postApi, posts);
    app.use(error);
}
