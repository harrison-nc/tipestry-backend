const validate = require('../model/login');
const express = require('express');
const validator = require('../middleware/validateReqParameters');

const router = express.Router();
const validateInput = validator(validate);

router.post('/', validateInput, (req, res) => {
    res.send();
});

module.exports = router;
