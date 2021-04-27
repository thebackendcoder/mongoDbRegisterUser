const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const registeredSchema = new mongoose.Schema({
    username: {
        type: String,
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

const registerInMongo = async function (req) {

    const { userName, email, password } = req.body
    const re = await userSchema.find({ email: email })
    console.log("the re.length is", re.length)
    if (re.length) {
        console.log("i am executed")
        return false;
    }
    try {
        const hashPasword = await bcrypt.hash(password, 10);
        console.log(typeof (hashPasword))

        const user = new userSchema({
            username: userName,
            email: email,
            hashPassword: hashPasword
        })
        const result = await user.save();
        return true;

    }
    catch (err) {
        console.log(err);
        return false;
    }
}


module.exports = {
    registerInMongo
}
