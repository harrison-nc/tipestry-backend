const auth = require('../middleware/auth');
const express = require('express');
const validatePost = require('../model/post');
const validator = require('../middleware/validateReqParameters');

const router = express.Router();
const validateParams = validator(validatePost);

router.post('/', [auth, validateParams], (req, res) => {
    res.send({ message: 'It works' });
});

module.exports = router;
