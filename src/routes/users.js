const express = require('express');
const Joi = require('joi');

const router = express.Router();

router.post('/', (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    res.status(200).send();
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
