const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// for access env file
require("dotenv").config();
const cors = require("cors");

// connect database
(async function () {
    try {
        const db = await require('./models/index');
        console.log("database connected");
    } catch (error) {
        console.error(error);
    }
})();

const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: true,
    credentials: true
}));
app.use('/users', usersRouter);

module.exports = app;
