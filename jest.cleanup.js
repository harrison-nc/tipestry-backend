const mongoose = require('mongoose');
const server = require('./src/index.server');

console.log('cleaning up environment');

async function disconnectDB() {
    await mongoose.connection.close();
}

function disconnectServer() {
    server.close();
}

afterAll(() => {
    try {
        disconnectDB();
    }
    catch (ex) {
        console.error(ex);
    }

    try {
        disconnectServer();
    }
    catch (ex) {
        console.error(ex);
    }
});
