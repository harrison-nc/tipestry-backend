const express = require('express');
const User = require('../db/user');
const validator = require('../middleware/validateReqParameters');

const router = express.Router();
const validateInput = validator(User.validateModel);

router.post('/', validateInput, async (req, res) => {
    const user = await User.create(req.body);

    res.status(200).send({
        name: user.name,
        email: user.email,
    });
});

module.exports = router;
