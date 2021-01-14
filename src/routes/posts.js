const auth = require('../middleware/auth');
const express = require('express');
const Post = require('../db/post');
const validatePost = require('../model/post');
const validator = require('../middleware/validateReqParameters');
const validateObjectId = require('../middleware/validateObjectId');

const router = express.Router();
const validatePostAndUser = validator.withUser(validatePost);
const paramId = validateObjectId();
const ObjectId = require('mongoose').Types.ObjectId;


router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
});

router.get('/:id', paramId, async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).send({ error: 'Post not found.' });

    res.send(post);
});

router.post('/', [auth, validatePostAndUser], async (req, res) => {
    const { activeUser, body } = req;

    const post = await Post.create(body, activeUser);

    res.send(post);
});

module.exports = router;
