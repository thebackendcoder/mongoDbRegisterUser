require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const userregister = require('./modules/mongoSchema.js')
const reg = require('./register/register')
const auth = require('./auth/auth')
const autherisation = require('./auth/aurtherisation')
const bodyParser = require('body-parser')
const dairy = require('./dairy/dailyDairy')
const app = express();
app.use(bodyParser.json())
const dbString = process.env.DBSTRING;
mongoose.connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true }).then(function (result) {
    console.log("Connected to the db")
}).catch((err) => {
    console.log(err)
});
app.get('/', function (req, res) {
    console.log("request is made to the server")
    res.send("welcome to the home page");
})
app.get('/login', function (req, res) {
    res.send("welcome to the login page");
})
app.get('/register', function (req, res) {
    console.log("the  request for the register  page is made");
    res.send("please do the registration");
})
// routes for handling the post request
app.post('/register', async function (req, res) {
    const { mobileNumber, email, password } = req.body
    try {
        const result = await reg.registerInMongo(req);
        if (!result) {
            res.send("there was an error storing the data or the email is already registered")
        }
        else {
            res.send("Thanks for registration")
        }
    }
    catch (err) {
        console.log(err);
    }
})
app.post('/login', auth.loginAuthentication);
app.post('/writeDailyDairy', autherisation.authenticationToken, async function (req, res) {

    const { myDay } = req.body;
    await dairy.writingDairy(req);
    res.send({
        message: "your dairy is successfuly updated"
    }).status(200)
})

app.listen(3000, function () {
    console.log("listenting at port 3000")
})
