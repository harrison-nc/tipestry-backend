const express = require('express');
const Post = require('../db/post');
const commentValidator = require('../model/comment');
const validator = require('../middleware/validateReqParameters');

const router = express.Router();
const validateComment = validator(commentValidator);

router.get('/', async (req, res) => {
	const comments = await Post.find().select('comments');

	res.send(comments);
});

router.post('/', validateComment, async (req, res) => {
	const { postId } = req.body;

	const post = await Post.findById(postId);

	if(!post) return res.status(404).send({ error: 'Post not found' });

	const { text } = req.body;

	let user = {};

	if (req.body.user) user = req.body.user;

	const comment = await post.addComment({ text, user });

	res.send(comment);
});

module.exports = router;