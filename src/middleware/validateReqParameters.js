module.exports = exports = function (validator) {
    return (req, res, next) => {
        const { error } = validator(req.body);

        if (error) {
            const { details } = error;

            const response = details.map((d) => {
                const { context, message } = d;
                const { key, value } = context;

                return {
                    key,
                    [key]: value,
                    message,
                }
            });

            return res.status(400).send({ error: response });
        }

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
