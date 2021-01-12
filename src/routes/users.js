const express = require('express');
const validator = require('../middleware/validateReqParameters');
const model = require('../model/user');

const router = express.Router();
const validateInput = validator(model.validate);

router.post('/', validateInput, (req, res) => {
    res.status(200).send(req.body);
});

module.exports = router;
