const jwt = require('jsonwebtoken');
require('dotenv').config();

async function authenticationToken(req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader;
    if (token == null) {
        console.log(" iam excuted")
        return res.sendStatus(401)
    };
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, success) {
        if (err) {
            res.sendStatus(401)
        }
        else {
            next();
        }
    });
    console.log("------------------------------------")
    //console.log(result);
}


module.exports = {
    authenticationToken
}