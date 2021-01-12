const express = require('express');

const app = express();

app.get('/', (req, res) => res.status(200).send({ message: 'Hello, World!' }));

const server = app.listen(3000, () => console.log('Connected to localhost:3000...'));

module.exports = server;
