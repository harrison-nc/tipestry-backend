const Joi = require('joi');

const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(5).required(),
}).label('login').required();

module.exports = function (input) {
    return schema.validate(input);
}
