const express = require('express');

const userRouter = require('./routing/userRouter');

const session = require('express-session')
const sessionStore = require('connect-session-knex')(session)

const server = express();

server.use(express.json());
server.use(session({
    name: 'testcookie',
    secret: 'this should come from process.env',
    cookie: {
        maxAge: 1000 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: new sessionStore ({
        knex: require('./data/db-config.js'),
        tablename: 'sessions',
        sessionidfieldname: 'sid',
        createTable: true,
        clearInterval: 1000 * 60 * 60
    })
}));



server.use('/api', userRouter);

module.exports = server;
