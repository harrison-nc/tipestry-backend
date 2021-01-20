const express = require('express');
const User = require('../db/user');
const validator = require('../middleware/validateReqParameters');

const router = express.Router();
const validateInput = validator(User.validateModel);

router.post('/', [validateInput, verifyEmail], async (req, res) => {
    const user = await User.create(req.body);

    res.status(200).send({
        name: user.name,
        email: user.email,
    });
});

async function verifyEmail(req, res, next) {
	const { email } = req.body;

	const exist = await User.findByEmail(req.body.email);

	if (exist) {
		const error = {
			error: {
				key: 'email',
				email: email,
				message: 'Email already exist.'
			}
		};
		return res.status(400).send(error);
	}
	next();
}

module.exports = router;
