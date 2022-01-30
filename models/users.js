"use strict";
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uuid: {
        type: String
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    collection: "users",
    id: false,
    timestamps: true
})

module.exports = mongoose.model("users", userSchema);