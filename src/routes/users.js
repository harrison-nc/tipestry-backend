const express = require('express');
const Joi = require('joi');
const validator = require('../middleware/validateReqParameters');

const router = express.Router();
const validateInput = validator(validateUser);

router.post('/', validateInput, (req, res) => {
    res.status(200).send(req.body);
});

const schema = Joi.object({
    name: Joi.string().min(4).max(15).required(),
    email: Joi.string().required(),
    password: Joi.string().required()
}).label('user').required();

function validateUser(user) {
    return schema.validate(user);
}

module.exports = router;
