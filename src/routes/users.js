const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    if (!req.body.name) return res.status(400).send();

    let length = +req.body.name.length;
    if (length < 4) return res.status(400).send();

    if (!req.body.email) return res.status(400).send();

    res.status(200).send();
});

module.exports = router;
