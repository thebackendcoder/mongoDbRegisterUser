const bcrypt = require('bcryptjs');
const userSchema= require('../modules/mongoSchema');


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

module.exports={
    loginAuthentication
}