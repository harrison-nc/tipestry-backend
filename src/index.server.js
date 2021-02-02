const app = require('./app');
const config = require('config');

const port = config.get('port');
const server = app.listen(port, () => console.log(`Connected to localhost:${port}...`));

module.exports = server;
