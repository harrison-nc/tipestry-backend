const config = require('config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
        unique: true,
        set: v => v.toLowerCase(),
    },
    password: {
        type: String,
        trim: true,
        required: true,
    }
});

userSchema.methods.generateAuthToken = generateAuthToken;

const User = mongoose.model('users', userSchema);

function generateAuthToken() {
    const payload = {
        _id: this._id,
        name: this.name,
        email: this.email,
    };

    const token = jwt.sign(payload, config.get('jwtPrivateKey'));
    return token;
}

const schema = Joi.object({
    name: Joi.string().min(4).max(15).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(5).required()
}).label('user').required();

function validateUser(user) {
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
