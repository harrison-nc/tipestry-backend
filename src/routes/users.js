const express = require('express');
const User = require('../db/user');
const validator = require('../middleware/validateReqParameters');
const { paramError } = require('../util/errors');
const { registerResult } = require('../util/values');

const router = express.Router();
const validateInput = validator(User.validateModel);

router.post('/', [validateInput, verifyEmail], async (req, res) => {
	const user = await User.create(req.body);

	const { name, email } = user;

	res.status(200).send(registerResult(name, email, 'Account created successfully'));
});

async function verifyEmail(req, res, next) {
	const { email } = req.body;

	const exist = await User.findByEmail(req.body.email);

	if (exist) {
		res.status(400);
		return res.send(paramError('email', email, 'Email already exist.'));
	}
	next();
}

module.exports = router;
