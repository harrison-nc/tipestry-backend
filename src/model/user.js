const Joi = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = mongoose.model('users', new Schema({
    name: {
        type: String,
        minlength: 4,
        maxlenth: 15,
        trim: true,
        required: true,
        set: v => v.toLowerCase(),
    },
    email: {
        type: String,
        required: true,
        trim: true,
        set: v => v.toLowerCase(),
    },
    password: {
        type: String,
        trim: true,
        required: true,
    }
}));

const schema = Joi.object({
    name: Joi.string().min(4).max(15).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required()
}).label('user').required();

function validateUser(user) {
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
