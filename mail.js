var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Prateekviju1770@gmail.com',
        pass: 'thefantasticone1770'
    }
});

function sendone(data) {

    var otp = Math.floor((Math.random() * 100000000) + 1).toString();
    // var msg = 'Your One time Password is: ' + otp;
    var mailOptions = {
        from: data.email,
        to: 'Prateekviju1770@gmail.com',
        subject: 'You Have recieved a feedback from ' + data.email,
        text: "Feedback is:- \n\n" + data.msg
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            revert(data.email)
        }
    });
}

exports.sendone = sendone;


function revert(Email_Id) {

    var mailOptions = {
        from: 'Prateekviju1770@gmail.com',
        to: Email_Id,
        subject: 'Thankyou for sharing your Feedback ',
        text: "Thankyou for sharing your valuable feedback with us. \n Hope you will like our website and will stay in touch with us. "
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Revert Email sent: ' + info.response);
        }
    });
}



// ------------------------------------- CONTACTING ADMIN FOR POST A AD -----------------------------------------------

function contacts(data) {

    var otp = Math.floor((Math.random() * 100000000) + 1).toString();
    // var msg = 'Your One time Password is: ' + otp;
    var mailOptions = {
        from: data.email,
        to: 'Prateekviju1770@gmail.com',
        subject: 'You Have Recieved a Request from ' + data.email,
        text: "Request is for posting a house ad:- \n\n" + data.msg
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            revert(data.email)
        }
    });
}

exports.contacts = contacts;


function revert(Email_Id) {

    var mailOptions = {
        from: 'Prateekviju1770@gmail.com',
        to: Email_Id,
        subject: 'Thankyou for Contacting Us ',
        text: "Thankyou for Contacting Us. We will upload your post request in a few working days and we will let you know "
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Revert Email sent: ' + info.response);
        }
    });
}