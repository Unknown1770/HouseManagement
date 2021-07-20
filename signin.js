const user = require('./user');
const crypto = require('crypto');


// Function for signing up the user 

function verify(data) {

    fname = data.fname;
    lname = data.lname;
    email = data.email;
    mob_no = data.contact;
    pwd = data.pwd1;
    cpwd = data.pwd2;
    checkbox = data.checkbox;


    var mobver = new RegExp("^[0-9]{10}$");

    var emailregex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    var passregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    var errs = [];

    if (pwd !== cpwd) {
        errs.push('Password Not Matched');
    }

    if (pwd.length < 8) {
        errs.push('Password is not long enough');
    }

    if (!emailregex.test(email)) {
        errs.push('Please Enter a Valid Email Address');
    };

    if (!mobver.test(mob_no)) {
        errs.push('Mobile Number should Be exatly 10 digit long');
    };

    if (checkbox != 'on' || checkbox == null) {
        errs.push('You must agree on terms & Conditions before continuing with us');
    }

    if (!passregex.test(pwd)) {
        errs.push('password should contain atleast one number and one special character');
    }

    return errs;
}

exports.verify = verify;


// Function to enter the record in the database

function signup(data) {
    let epwd = crypto.createHash('md5').update(data.pwd1).digest('hex');
    // console.log("The Encypted text is:- " + hash);

    var obj = {
        first_name: data.fname,
        last_name: data.lname,
        email_id: data.email,
        contact_info: data.contact,
        password: epwd
    }
    user.create(obj, (err, item) => {
        if (err) {
            console.log(err);
            return err;
        } else {
            console.log("Successfully Registered");
            return true;
        }
    });
}

exports.signup = signup;