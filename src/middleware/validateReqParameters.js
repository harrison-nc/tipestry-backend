const { authError, inputError } = require("../util/errors");

module.exports = exports = function (validator) {
    return (req, res, next) => {
        const { error } = validator(req.body);

        if (error) {
            const response = inputError(error);

            return res.status(400).send(response);
        }

        next();
    };
}

exports.withUser = function (validator) {
    return (req, res, next) => {
        const { activeUser, body } = req;

        if (!activeUser) return res.status(400).send(authError('User not logged in'));

        const { error } = validator(activeUser, body);

        if (error) return res.status(400).send(inputError(error));

        next();
    }
}
