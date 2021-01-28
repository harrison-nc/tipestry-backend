const Post = require('../db/post');
const { postError } = require('../util/errors');

const verfy = async (req, res, next, postId) => {
    const post = await Post.findById(postId);

    if (!post) {
        res.status(404);
        return res.send(postError(postId, 'Post not found'));
    }

    req.postParam = post;

    next();
};

module.exports = exports = function verifyParamPostId(req, res, next) {
    verfy(req, res, next, req.params.id);
}

exports.inRequestBody = function (req, res, next) {
    verfy(req, res, next, req.body.postId);
};
