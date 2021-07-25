//----------------------------------------- JS System lib import --------------------------------------

const exp = require('express');
const bp = require('body-parser');
const https = require('https');
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');
var crypto = require('crypto');
const session = require('express-session');
require("dotenv").config();


//----------------------------------------------------- JS udf library import -------------------------------------
const mail = require('./mail');
const sign = require('./signin');
const detail = require('./model');
const user = require('./user');


// ----------------------------------------------- CONNECTING TO THE DATABASE -----------------------------------------------

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, useMongoClient: true }, err => {
    console.log('Connection To Database is done')
})


// ----------------------------------------------- INITIALIZING  THE BASIC SETUP ----------------------------------------
const app = exp();
app.use(bp.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(exp.json({ limit: "1mb" }));
app.use(exp.static(path.join(__dirname, 'public')));

user_type = '';
sess_name = '';
sess_user = '';

app.use(session({

    // It holds the secret key for session
    secret: 'Vijayant@123',

    // Forces the session to be saved
    // back to the session store
    resave: true,

    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: true
}))


//-----------------------------------Multer Library Defination---------------------------------------------------
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });




// ------------------------------------- Route for the main landing page --------------------------------------------
app.get('/', function(req, res) {
    if (sess_name == '') {
        console.log("No session is running")
        res.render('index');
    } else {
        console.log("Session is Running :- " + sess_name);
        res.redirect('/home');
    }
})


//-------------------------------------- Route for the home page -----------------------------------------------------
app.get('/home', function(req, res) {
    detail.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        } else {
            res.render('home', { items: items, users: user_type });
        }
    });
})

//-------------------------------------- Route for the Wishlist Page -----------------------------------------------------
app.get('/saved', function(req, res) {
    detail.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        } else {
            var data = [];
            for (var i = 0; i < items.length; i++) {
                for (var j = 0; j < sess_user.wish.length; j++) {
                    if (items[i]._id == sess_user.wish[j]) {
                        data.push(items[i]);
                        console.log(sess_user.wish[j]);
                        console.log(data.length)
                    }
                }
            }
            // res.redirect("/home")
            res.render('save', { items: data });
        }
    });
})


//-------------------------------------- Route for the FILTER PLACE PAGE -----------------------------------------------------
app.post('/place', function(req, res) {
    place = req.body.placef;
    console.log(place)
    detail.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        } else {

            var data = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i].house_place == place) {
                    data.push(items[i]);
                    console.log(data.length);
                }
            }

            // res.render('place', { items: items, placef: place });
            res.render('place', { items: data, users: user_type });
        }
    });
})


//-------------------------------------- Route for the FILTER PRICE PAGE -----------------------------------------------------
app.post('/price', function(req, res) {
    price = req.body.pricef;
    console.log(price)
    detail.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        } else {

            var data = [];
            for (var i = 0; i < items.length; i++) {
                if (price == 10000) {
                    if (items[i].house_rent < 10000) {
                        data.push(items[i]);
                        console.log(data.length)
                    }
                } else if (price == 15000) {
                    if (items[i].house_rent < 15000 && items[i].house_rent >= 10000) {
                        data.push(items[i]);
                        console.log(data.length)
                    }
                } else if (price == 20000) {
                    if (items[i].house_rent < 20000 && items[i].house_rent >= 15000) {
                        data.push(items[i]);
                        console.log(data.length)
                    }
                } else {
                    if (items[i].house_rent < 30000 && items[i].house_rent >= 20000) {
                        data.push(items[i]);
                        console.log(data.length)
                    }
                }


            }
            // res.render('price', { items: items, pricef: price });
            res.render('place', { items: data, users: user_type });

        }
    });
})


//-------------------------------------- Route for the FILTER HOUSE TYPE PAGE ----------------------------------------------
app.post('/type', function(req, res) {
    type = req.body.typef;
    console.log(type)
    detail.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        } else {

            var data = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i].house_type == type) {
                    data.push(items[i]);
                    console.log(data.length);
                }
            }

            // res.render('type', { items: items, typef: type });
            res.render('place', { items: data, users: user_type });
        }
    });
})


//---------------------------------------- ROUTE FOR NEW HOME POST PAGE ------------------------------------------------------
app.get('/posts', (req, res) => {
    detail.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        } else {
            res.render('posts', { users: user_type });
        }
    });
});


app.post('/upload', upload.single('image'), (req, res, next) => {
    console.log(req.body);
    var obj = {
        person_name: req.body.person,
        house_type: req.body.type,
        person_mail: req.body.email,
        house_place: req.body.place,
        house_rent: req.body.rent,
        phone_no: req.body.phone,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    detail.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            // item.save();
            res.redirect('/');
        }
    });
});



//-------------------------------------------------SIGN IN PAGE ROUTE-------------------------------------------
// Get Route signin

app.get('/signin', function(req, res) {
    res.render('signin')
})

// Post route signin
app.post('/signin', function(req, res) {

    errors = [];
    email = req.body.email;
    pwd = req.body.upwd;
    let enpwd = crypto.createHash('md5').update(pwd).digest('hex');

    user.findOne({ email_id: email }, (err, users) => {

        if (err) {
            console.log(err);
            return err;
        } else {

            if (!users) {
                res.render('errors', { msg: "Oops!! Entered Mail ID Doesn't Exist" });
            } else {
                if (enpwd !== users.password) {
                    res.render('errors', { msg: "Access Denied !! Incorrect Credentials" });
                } else {
                    console.log("Password matched.... You rocked bro");
                    req.session.name = users.first_name + users.last_name;
                    req.session.user = users;

                    sess_name = req.session.name;
                    sess_user = req.session.user;

                    var mail = (users.email_id).toLowerCase();

                    if (mail == 'prateekviju1770@gmail.com' || mail == 'vikassasngwan652@gmail.com')
                        user_type = 'admin';
                    else
                        user_type = 'users';

                    console.log(user_type);
                    res.redirect("/home");
                }
            }
        }
    });

});


// ---------------------------- SIGNOUT PAGE ROUTE -----------------------------------------

app.get("/signout", function(req, res) {
    req.session.destroy((err) => {
        sess_name = '';
        console.log("Congrutalation.... Session is destroyed succesfully");
        res.redirect('/signin');
    })
})


//--------------------------------------------- SIGN UP PAGE ROUTE -----------------------------------------------------
// Get Route signup page

app.get('/signup', function(req, res) {
    res.render('signup');
})

// Post route signup page

app.post('/signup', function(req, res) {

    errors = []
    email = req.body.email;

    user.findOne({ email_id: email }, (err, users) => {

        if (err) {
            console.log(err);
            return err;
        } else {

            if (users) {
                errors.push("Email Id Already Exist");
                res.render('error', { data: { err: errors, msg: "Oops!! There are some Problems while signing you in!" } });
            } else {

                //Verify the details of the users if the mail doesn't exist 
                errs = sign.verify(req.body);

                if (errs.length > 0) {
                    res.render('error', { data: { err: errs, msg: "Oops!! There are some Problems while signing you in!" } });
                } else {

                    //Registering the user if all details are correct
                    resp = sign.signup(req.body);
                    if (!resp) {
                        res.render('error', { data: { err: errs, msg: "Registartion succesfull", users: user_type } });
                    } else {
                        res.render('error', { data: { err: errs, msg: resp, users: user_type } });
                    }
                }
            }
        }
    });
})


//----------------------------------------------- Error Page Route -------------------------------------------------------
app.get("/error", function(req, res) {
    res.render('error', { err: 'Password Not Matched', users: user_type })
})


//----------------------------------------------- ABOUT US PAGE ROUTE -----------------------------------------------------
app.get("/about", function(req, res) {
    res.render('about', { users: user_type });
    console.log(user_type);
})


//----------------------------------------------- POST ID ROUTE -----------------------------------------------------
app.post("/postid", async function(req, res) {
    id = req.body.id;

    var result = await user.findByIdAndUpdate(
        sess_user._id, { $push: { wish: id } }, { new: true }
    );
    console.log(result);
    res.redirect("/home");

})


// -------------------------------------- INFO FOR CONTACTING ANOTHER CUSTOMER -------------------------------
app.post("/info", function(req, res) {
    var mail = req.body.mail;
    console.log("data send is:- " + mail);

    detail.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        } else {
            var data = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i].person_mail == mail) {
                    console.log(items[i].person_mail);
                    console.log(items[i].person_name);
                    console.log(items[i].phone_no);

                    data.push(items[i].person_mail);
                    data.push(items[i].person_name);
                    data.push(items[i].phone_no);
                    res.render('info', { data: data, users: user_type })
                }
            }
        }
    });

    // res.redirect("/home");
    // res.render('info', { data: data, users: user_type })

})


//----------------------------------------------- SERVICES PAGE ROUTE -----------------------------------------------------
app.get("/service", function(req, res) {
    res.render('service', { users: user_type });
    console.log(user_type);
})


//----------------------------------------- CONTACT ADMIN FOR POST REQUEST ROUTE --------------------------------------------
app.get("/addpost", function(req, res) {
    res.render('contact', { users: user_type });
})

app.post("/contact", function(req, res) {
    mail.contacts(req.body);
    res.redirect('/');
})

//----------------------------------------------- FEEDBACK PAGE ROUTE -----------------------------------------------------
//feedback page get route

app.get("/feedback", function(req, res) {
    res.render('sendmail', { users: user_type });
})

// feedback page post route

app.post("/feedback", function(req, res) {
    mail.sendone(req.body);
    res.redirect('/');
})


//-------------------------------------------Server Listening on port 3000 ------------------------------------------------
app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000");
});