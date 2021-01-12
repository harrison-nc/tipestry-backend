const express = require('express');
const User = require('../db/user');
const validator = require('../middleware/validateReqParameters');

const router = express.Router();
const validateInput = validator(User.validate);

router.post('/', validateInput, async (req, res) => {
    const user = await User.create(req.body);

    res.status(200).send(user);
});

module.exports = router;
