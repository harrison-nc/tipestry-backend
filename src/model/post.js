const Joi = require('joi');

const schema = Joi.object({
    title: Joi.string().min(5).required(),
    resourceUrl: Joi.string().required(),
    description: Joi.string(),
    upVotes: Joi.number(),
    downVotes: Joi.number(),
    tags: Joi.array().min(1).required(),
    comments: Joi.array().items({
        comment: Joi.object({
            test: Joi.string().required(),
            userId: Joi.objectId().required()
        }).label('comment'),
    }).label('comments')
}).label('post').required();

module.exports = function (input) {
    return schema.validate(input);
}
