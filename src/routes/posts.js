const auth = require('../middleware/auth');
const express = require('express');
const Post = require('../db/post');
const validatePost = require('../model/post');
const validator = require('../middleware/validateReqParameters');

const router = express.Router();
const validatePostAndUser = validator.withUser(validatePost);

router.post('/', [auth, validatePostAndUser], async (req, res) => {
    const { activeUser, body } = req;

    const post = await Post.create(body, activeUser);

    res.send(post);
});

module.exports = router;
