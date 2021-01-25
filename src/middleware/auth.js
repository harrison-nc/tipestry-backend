const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../db/user');

const { authError } = require('../util/errors');

const defaultOptions = {
    tokenRequired: true,
}

module.exports = function (options = defaultOptions) {
    return (req, res, next) => {
        const token = req.header('x-auth-token');

        const currentConfig = { ...defaultOptions, ...options };

        if (token) try {
            const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
            req.activeUser = decoded;
        } catch (e) {
            console.error(e);
            return res.status(400).send(authError('Invalid token'));
        }
        else if (currentConfig.tokenRequired) {
            res.status(401);
            return res.send(authError('Access denied. No access token provided'));
        }

        next();
    }
}
