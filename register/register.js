const bcrypt= require('bcryptjs');
const uS= require('../modules/mongoSchema');
const mailSend= require('../modules/mail');
const jwt = require('jsonwebtoken');

const registerInMongo = async function (req) {
    const { mobileNumber, email, password } = req.body
    console.log("------------------------", mobileNumber)
    const re = await uS.find({ email: email })
    console.log("the re.length is", re.length)
    if (re.length) {
        console.log("i am executed")
        return false;
    }
    try {
        const hashPasword = await bcrypt.hash(password, 10);
        console.log(typeof (hashPasword))

        const user = new uS({
            mobileNumber: parseInt(mobileNumber),
            email: email,
            hashPassword: hashPasword,
            isVerified: false
        })
        const result = await user.save();
        const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
        await mailSend.sendMail(accessToken,email);
        return true;

    }
    catch (err) {
        console.log(err);
        return false;
    }
}

module.exports={
   registerInMongo    
} 
