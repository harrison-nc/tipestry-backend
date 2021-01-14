const ObjectId = require('mongoose').Types.ObjectId;

module.exports = function () {
    return (req, res, next) => {
        if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: 'Invalid request param "id"' });

        next();
    }
}
