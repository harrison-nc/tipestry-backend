const Joi = require('joi');

const schema = Joi.object({
	postId: Joi.objectId().required(),
	text: Joi.string().required(),
	user: Joi.object({
		name: Joi.string(),
		email: Joi.string().email(),
	})
}).label('comment').required();

module.exports = function(input) {
	return schema.validate(input);
}

