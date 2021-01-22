const Joi = require('joi');

const schema = Joi.object({
    title: Joi.string().min(5).required(),
    resourceUrl: Joi.string().required(),
    description: Joi.string(),
    upVotes: Joi.number(),
    downVotes: Joi.number(),
    tags: Joi.array().min(1).required()
}).label('post').required();

const userSchema = Joi.object({
    _id: Joi.objectId().required(),
    name: Joi.string().required(),
    email: Joi.string().required().email(),
}).label('post user');

function validatePostUser(user) {
    return userSchema.validate(user);
}

module.exports = function (user, input) {
    const { _id, name, email } = user;

    let result = validatePostUser({
        _id,
        name,
        email,
    });

    if (result.error) return result;

    return schema.validate(input);
}
