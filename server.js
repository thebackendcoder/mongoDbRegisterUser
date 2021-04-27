const express = require('express')
const mongoose = require('mongoose');
const userregister = require('./modules/mongoSchema.js')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
const dbString = "mongodb+srv://mynewhero:fathermother@authmongodb.xvady.mongodb.net/registereduser?retryWrites=true&w=majority";
mongoose.connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true }).then(function (result) {
    console.log("Connected to the db")
}).catch((err) => {
    console.log(err)
});

app.get('/', function (req, res) {
    console.log("request is made to the server")
    res.send("welcom to the home page");
})

app.get('/login', function (req, res) {
    res.send("welcome to the login page");
})

app.get('/register', function (req, res) {
    console.log("the  requetst for the register  page is made");
    res.send("welcome to the register page");
})

// routes for handling the post request
app.post('/register', async function (req, res) {

    const { userName, email, password } = req.body

    console.log("the username and password  is", userName, password, email);
    try {
        const result = await userregister.registerInMongo(req);
        console.log("hahah the result is ------------", result)
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

app.listen(3000, function () {
    console.log("listenting at port 3000")
})