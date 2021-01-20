const Post = require('../db/post');

const verfy = async (req, res, next, postId) => {
    const post = await Post.findById(postId);

    if(!post) {
        const error = {
        	error: {
        		postId: postId,
        		messages: ['Post not found']
     		}
     	};

    	return res.status(404).send(error);
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