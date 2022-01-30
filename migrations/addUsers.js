'use strict';
let db;
// for access env file
require("dotenv").config();
// connect database
(async function () {
    try {
        db = await require('../models/index');
        console.log("database connected");
    } catch (error) {
        console.error(error);
    }
})();
const {
    v4: uuidv4
} = require('uuid');
const users = require('../models/users');

users.create([{
        uuid: uuidv4(),
        first_name: 'Admin',
        last_name: 'Admin',
        username: `AdminAdmin_${Math.round(Math.random() * 10000)}`,
        password: `${Math.round(Math.random() * 10000)}`,
        group: 'admin'
    },
    {
        uuid: uuidv4(),
        first_name: 'User',
        last_name: 'User',
        username: `UserUser_${Math.round(Math.random() * 10000)}`,
        password: `${Math.round(Math.random() * 10000)}`,
        group: 'user'
    }
]).then(() => {
    console.log("Users Created");
    process.exit();
}).catch((error) => {
    console.error(error);
    process.exit();
});