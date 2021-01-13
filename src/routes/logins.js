const express = require('express');
const validator = require('../middleware/validateReqParameters');
const validate = require('../model/login');
const { User } = require('../model/user');

const router = express.Router();
const validateInput = validator(validate);

router.post('/', validateInput, async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    if (!(user.password === req.body.password)) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.header('x-auth-token', token);
    res.send({});
});

module.exports = router;
