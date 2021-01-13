const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().min(4).max(15).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(5).required()
}).label('user').required();

module.exports = function (user) {
    return schema.validate(user);
}
