const express = require('express');
const validator = require('../middleware/validateReqParameters');
const validate = require('../model/login');
const User = require('../db/user');
const { loginError } = require('../util/errors');
const { loginResult } = require('../util/values');

const router = express.Router();
const validateInput = validator(validate);

router.post('/', validateInput, async (req, res) => {
    const { email, password } = req.body;

    const { succeeded, token, user } = await User.login(email, password);

    if (!succeeded) return res.status(400).send(loginError('Invalid email or password'));

    const { name } = user;

    res.header('x-auth-token', token);

    res.send(loginResult(name, email, token, 'Login successeful'));
});

module.exports = router;
