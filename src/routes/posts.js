const auth = require('../middleware/auth')({ tokenRequired: false });
const express = require('express');
const multer = require('multer');
const path = require('path');
const Post = require('../db/post');
const { getID, isValid } = require('../util/objectId');
const { paramError, internalError } = require('../util/errors');
const { validate, validateComment } = require('../model/post');
const validator = require('../middleware/validateReqParameters');
const validateObjectId = require('../middleware/validateObjectId');
const validatePost = require('../middleware/validatePost');

const storage = multer.diskStorage({
    destination: './public/images',
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const fileId = getID();
        const fileName = `${fileId}${ext}`;

        req.fileName = fileName;
        req.fileId = fileId;

        cb(null, fileName);
    },
});

const upload = multer({ storage });
const router = express.Router();
const validateUserAndPost = validator.withUser(validate);
const validateCommentMiddleware = validator(validateComment);
const validatePostId = validateObjectId();
const uploadFile = upload.single('file');

router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
});

router.get('/:id', [validatePostId, validatePost], async (req, res) => {
    const post = req.postParam;

    res.send(post);
});

router.get('/search/:query', async (req, res) => {
    const query = req.params.query;

    if (!query && query.trim() === '') res.send([]);

    try {
        const terms = query.split(' ');
        const postPromises = Promise.all(terms.map(term => findPostMatchingQuery(term)));
        const matchingPosts = await postPromises;
        const flattenArray = matchingPosts.flat(100);
        const sortedPosts = flattenArray.sort((a, b) => b.views - a.views);
        if (sortedPosts.length < 10) return res.send(sortedPosts);
        const limit10 = sortedPosts.slice(0, 11);
        res.send(limit10);
    }
    catch (ex) {
        console.error(ex);
    }

    res.send([]);
});

router.post('/', [auth, validateUserAndPost], async (req, res) => {
    const { activeUser, body } = req;

    const post = await Post.create(body, activeUser);

    res.send(post);
});

router.post('/uploads', [auth, validateUserAndPost, uploadFile], async (req, res) => {
    const { activeUser, body } = req;

    try {
        const { file, fileId } = req;

        if (!file) {
            return res.status(400).send(paramError('file', file, 'Upload file is required'));
        }

        if (!fileId || !isValid(fileId)) {
            console.error('fileId is not valid', fileId);
            res.status(500)
            return res.send(internalError('The server was unable to save the uploaded file'));
        }

        const post = req.body;
        delete post.file;
        post._id = req.fileId;
        post.resourceUrl = `images/${req.fileName}`;

        const createdPost = await Post.create(body, activeUser);

        res.send(createdPost);
    }
    catch (ex) {
        // todo: delete uploaded file
        throw ex;
    }
});

router.post('/:id/upvotes', [validatePostId, validatePost], async (req, res) => {
    const post = req.postParam;

    const { upVotes } = req.body;

    post.upVotes = upVotes;

    await post.save();

    res.send({ upVotes });
});

router.post('/:id/downvotes', [validatePostId, validatePost], async (req, res) => {
    const post = req.postParam;

    const { downVotes } = req.body;

    post.downVotes = downVotes;

    await post.save();

    res.send({ downVotes });
});

router.get('/:id/comments', [validatePostId, validatePost], async (req, res) => {
    const post = req.postParam;

    const { _id, comments } = post;

    res.send({ _id, comments });
});

router.post('/:id/comments', [auth, validatePostId, validatePost, validateCommentMiddleware], async (req, res) => {
    const post = req.postParam;

    let { text, user } = req.body;

    const activeUser = req.activeUser;

    if (activeUser) user = activeUser;

    try {
        const comment = await post.addComment({ text, user: user });
        res.send(comment);
    }
    catch (ex) {
        console.error(ex);
        res.status(500).send();
    }
});

const findPostMatchingQuery = async (query) => {
    const regex = new RegExp(query, 'i');
    const post = await Post.find({ title: { $regex: regex } });
    return post;
}

module.exports = router;

