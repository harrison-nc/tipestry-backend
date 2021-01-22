const express = require('express');
const validator = require('../middleware/validateReqParameters');
const validate = require('../model/login');
const User = require('../db/user');

const router = express.Router();
const validateInput = validator(validate);

router.post('/', validateInput, async (req, res) => {
    const { email, password } = req.body;

    const { succeeded, token, user } = await User.login(email, password);

    if (!succeeded) return res.status(400).send({
        error: {
            login: {
                message: 'Invalid email or password'
            }
        }
    });

    const { name } = user;

    res.header('x-auth-token', token);

    res.send({
        login: {
            message: 'Login successeful',
            ['access-token']: token,
            name,
            email,
        }
    });
});

module.exports = router;
