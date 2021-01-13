const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.post('/', auth, (req, res) => {
    const { title, resourceUrl, tags } = req.body;

    if (!title) return res.status(400).send('title not provided');

    if (!resourceUrl) return res.status(400).send('resourceUrl not provided');

    if (!tags) return res.status(400).send('tags not provided');

    if (!(Array.isArray(tags))) return res.status(400).send('tags should be an array');

    if (tags.length < 1) return res.status(400).send('at least one tag should be provided');

    res.send({ message: 'It works' });
});

module.exports = router;
