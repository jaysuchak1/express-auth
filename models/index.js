const mongoose = require('mongoose');
const URL = `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
console.log(URL);
const connect = mongoose.connect(URL);
module.exports = connect;