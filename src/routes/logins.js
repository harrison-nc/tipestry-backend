const express = require('express');
const validator = require('../middleware/validateReqParameters');
const validate = require('../model/login');
const User = require('../db/user');

const router = express.Router();
const validateInput = validator(validate);

router.post('/', validateInput, async (req, res) => {
    const { email, password } = req.body;

    const { succeeded, token } = await User.login(email, password);

    if (!succeeded) return res.status(400).send('Invalid user or password');

    res.header('x-auth-token', token);

    res.send({
        message: 'Login successful',
        ['access-token']: token,
    });
});

module.exports = router;
