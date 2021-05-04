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

const registerInMongo = async function (req) {

    const { mobileNumber, email, password } = req.body
    console.log("------------------------", mobileNumber)
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
            mobileNumber: parseInt(mobileNumber),
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

const loginAuthentication = async function (req, res, next) {

    const { email, password } = req.body;
    let userPass;
    let isValid;
    const re = await userSchema.find({ email: email })
    if (!re.length) {
        res.send("the user doesnnt exists, please register");
    }
    else {
        const person = await userSchema.findOne({ 'email': email })
        console.log(person)
        userPass = person.hashPassword
        isValid = await bcrypt.compare(password, userPass)
        if (isValid) {
            res.redirect('/');
        }
        else {
            res.send("invalid cred")
        }
    }

}
module.exports = {
    registerInMongo, loginAuthentication
}
