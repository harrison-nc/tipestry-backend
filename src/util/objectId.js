const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.getID = () => new ObjectId();
exports.isValid = (id) => ObjectId.isValid(id);
