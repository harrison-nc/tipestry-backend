const express = require('express');
const Post = require('../db/post');
const commentValidator = require('../model/comment');
const validator = require('../middleware/validateReqParameters');
const postVerifier = require('../middleware/verifyPost');

const router = express.Router();
const validateComment = validator(commentValidator);
const verifyPost = postVerifier.inRequestBody;

router.post('/', [validateComment, verifyPost], async (req, res) => {
	const post = req.postParam;

	const { text } = req.body;

	let user = {};

	if (req.body.user) user = req.body.user;

	const comment = await post.addComment({ text, user });

	res.send(comment);
});

module.exports = router;