const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const registeredSchema = new mongoose.Schema({
    mobileNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashPassword: {
        type: String,
        Required: true
    }

})
const userSchema = mongoose.model('userdetails', registeredSchema);
module.exports = userSchema