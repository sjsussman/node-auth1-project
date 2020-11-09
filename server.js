const express = require('express');

const userRouter = require('router name location');

const server = express();

server.use(express.json());
server.use('/', userRouter);

module.exports = server;