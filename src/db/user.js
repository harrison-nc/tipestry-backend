const mongoose = require('mongoose');
const { User, validate } = require('../model/user');


function createUser(value) {
    const user = new User({
        name: value.name,
        email: value.email,
        password: value.password,
    });

    return user.save();
}

User.create = createUser;
User.validate = validate;

module.exports = User;
