const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.post('/', auth, (req, res) => {
    res.send('It works');
});

module.exports = router;
