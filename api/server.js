const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
// const session = require("express-session")

// const sessionConfig = {
//     name: "innocent cookie :\)",
//     secret: "This is the secretest secret secret to ever secretly secret....... SECRET",
//     cookie: {
//         maxAge: 1000 * 60 * 60,
//         secure: false,
//         httpOnly: true
//     },
//     resave: false,
//     saveUninitialized: true
// }

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
// server.use(session(sessionConfig))

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
