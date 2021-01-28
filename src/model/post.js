const Joi = require('joi');

const schema = Joi.object({
    title: Joi.string().min(5).required(),
    resourceUrl: Joi.string().required(),
    description: Joi.string(),
    upVotes: Joi.number(),
    downVotes: Joi.number(),
    tags: Joi.array()
}).label('post').required();

const userSchema = Joi.object({
    _id: Joi.objectId().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
}).label('post user');

const commentSchema = Joi.object({
    postId: Joi.objectId().required(),
    text: Joi.string().trim().required(),
    user: Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
    })
}).label('comment').required();

function validateComment(input) {
    return commentSchema.validate(input, { abortEarly: false });
}

function validatePostUser(user) {
    return userSchema.validate(user, { abortEarly: false });
}

function validatePost(user, input) {
    const { _id, name, email } = user;

    let result = validatePostUser({ _id, name, email });

    if (result.error) return result;

    return schema.validate(input, { abortEarly: false });
}


module.exports = {
    validate: validatePost,
    validatePostUser: validatePostUser,
    validateComment: validateComment,
};
