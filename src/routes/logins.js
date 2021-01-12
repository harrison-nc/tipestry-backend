const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    if (!req.body.email) return res.status(400).send();

    res.send();
});

module.exports = router;
