const jwt = require('jsonwebtoken');
const mSchema = require('../modules/mongoSchema');
require('dotenv').config();


async function verifyMail(req, res){
    const tok = req.query.token;
    jwt.verify(tok, process.env.ACCESS_TOKEN_SECRET, async function (err, success) {
        if (err) {
            res.sendStatus(401)
        }
        else {
            const mail = await jwt.verify(tok, process.env.ACCESS_TOKEN_SECRET);
            console.log(mail)
            
            const filter = {email: mail}
            const update ={isVerified: true}
            const ress = await  mSchema.findOneAndUpdate(filter , update);
            
            console.log("the response is ",ress)
            res.send("Thank you have successfuly register")
        }
    });

}
module.exports = {
    verifyMail
}