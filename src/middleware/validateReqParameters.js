module.exports = exports = function (validator) {
    return (req, res, next) => {
        const { error } = validator(req.body);

        if (error) return res.status(400).send(error.details);

        next();
    };
}

exports.withUser = function (validator) {
    return (req, res, next) => {
        const { activeUser, body } = req;

        if (!activeUser) return res.status(400).send('User not logged in');

        const { error } = validator(activeUser, body);

        if (error) return res.status(400).send(error.details);

        next();
    }
}
