const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const validateModel = require('../model/user');

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

async function createUser(value) {
    const salt = await bcrypt.genSalt(10);

    const user = new User({
        name: value.name,
        email: value.email,
        password: await bcrypt.hash(value.password, salt),
    });

    return user.save();
}

function findByEmail(email) {
    return User.findOne({ email });
}

function verifyPassword(password) {
    return password === this.password;
}

async function login(email, password) {
    const user = await findByEmail(email);

    if (!user) return { succeeded: false };

    const match = await user.verifyPassword(password);

    if (!match) return { succeeded: false };

    const token = user.generateAuthToken();

    return { succeeded: true, token };
}

function generateAuthToken() {
    const payload = {
        _id: this._id,
        name: this.name,
        email: this.email,
    };

    const token = jwt.sign(payload, config.get('jwtPrivateKey'));
    return token;
}

userSchema.methods.generateAuthToken = generateAuthToken;
userSchema.methods.verifyPassword = verifyPassword;

userSchema.statics.create = createUser;
userSchema.statics.validateModel = validateModel;
userSchema.statics.findByEmail = findByEmail;
userSchema.statics.login = login;

const User = mongoose.model('users', userSchema);

module.exports = User;
