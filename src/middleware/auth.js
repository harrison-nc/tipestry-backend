const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401)
            .send({
                error: {
                    auth: {
                        message: 'Access denied. No access token provided'
                    }
                }
            });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.activeUser = decoded;
        next();
    }
    catch (e) {
        res.status(400).send({
            error: {
                auth: {
                    message: 'Invalid token'
                }
            }
        });
    }
}
