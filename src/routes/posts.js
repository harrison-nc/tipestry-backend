const auth = require('../middleware/auth');
const express = require('express');
const Post = require('../db/post');
const validatePost = require('../model/post');
const validator = require('../middleware/validateReqParameters');
const validateObjectId = require('../middleware/validateObjectId');
const verifyPost = require('../middleware/verifyPost');

const router = express.Router();
const validatePostAndUser = validator.withUser(validatePost);
const validatePostId = validateObjectId();
const ObjectId = require('mongoose').Types.ObjectId;


router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
});

router.get('/:id', [validatePostId, verifyPost], async (req, res) => {
    const post = req.postParam;

    res.send(post);
});

router.post('/', [auth, validatePostAndUser], async (req, res) => {
    const { activeUser, body } = req;

    const post = await Post.create(body, activeUser);

    res.send(post);
});

router.post('/:id/votes', [validatePostId, verifyPost], async (req, res) => {
    const post = req.postParam;

    const { upVotes, downVotes } = req.body;

    post.upVotes = upVotes;
    post.downVotes = downVotes;
    await post.save();

    res.send({ upVotes, downVotes });
});

router.get('/:id/comments', [validatePostId, verifyPost], async (req, res) => {
    const post = req.postParam;

    const { _id, comments } = post;

    res.send({ _id, comments });
});

module.exports = router;

