const { isValid } = require('../util/objectId');
const { paramError } = require('../util/errors');

module.exports = exports = function () {
    return (req, res, next) => {
        const { id } = req.params;

        if (!isValid(id)) {
            res.status(400);
            return res.send(paramError('id', id, 'Invalid request param "id"'));
        }

        next();
    }
}
