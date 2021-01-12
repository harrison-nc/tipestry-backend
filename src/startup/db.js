const config = require('config');
const mongoose = require('mongoose');

module.exports = async function () {
    const db = config.get('db');
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    };

    try {
        await mongoose.connect(db, options);
        console.log(`Connected to db ${db}...`)
    }
    catch (e) {
        console.log(`Failed to connect to db ${db}`);
    }
}
