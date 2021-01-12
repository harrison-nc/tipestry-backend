const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.status(400).send('Name not provided');
});

module.exports = router;
