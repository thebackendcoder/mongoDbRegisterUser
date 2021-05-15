var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thebackendcoder@gmail.com',
        pass: 'Father@786'
    }
});

async function sendMail(token,email) {

    const veryficationLink = `http://localhost:3000/verify?token=${token}`;
    var mailOption = {
        from: 'thebackendcoder@gmail.com',
        to: email,
        subject: 'complete registration',
        text: `Hi please complete your regestration process  by clicking the link below ${veryficationLink}`,
    }
   await transporter.sendMail(mailOption)
}

module.exports={
    sendMail
}