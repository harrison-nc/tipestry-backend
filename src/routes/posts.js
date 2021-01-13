const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.post('/', auth, (req, res) => {
    if (!req.body.title) return res.status(400).send('title not provided');
    res.send('It works');
});

module.exports = router;
