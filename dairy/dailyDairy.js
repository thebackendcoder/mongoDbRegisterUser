const daySchema = require('../modules/daySchema');
const jwt = require('jsonwebtoken')
const atob = require('atob')
async function writingDairy(req) {
    const { myDay } = req.body
    const authToken = req.headers['authorization']
    console.log(authToken)
    const mail = await jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET);
    console.log(mail)
    const day = new daySchema({
        myDay: myDay,
        user: mail
    })
    await day.save();
}

module.exports = {
    writingDairy
}


