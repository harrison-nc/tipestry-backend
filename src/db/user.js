const bcrypt = require('bcrypt');
const { User, validate } = require('../model/user');

async function createUser(value) {
    const salt = await bcrypt.genSalt(10);

    const user = new User({
        name: value.name,
        email: value.email,
        password: await bcrypt.hash(value.password, salt),
    });

    return user.save();
}

User.create = createUser;
User.validate = validate;

module.exports = User;
