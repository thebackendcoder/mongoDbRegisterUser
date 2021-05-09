const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const daySch = new mongoose.Schema({
    myDay: {
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }

})
const daySchema = mongoose.model('dayschema', daySch);
module.exports = daySchema
