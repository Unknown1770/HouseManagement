function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());


    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/signedin');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        console.log('Signed in as: ' + xhr.responseText);
    };
    xhr.send('idtoken=' + id_token);
}


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
}


//Confirming the passwords
var check = function() {
    if (document.getElementByName('pwd1').value ==
        document.getElementByName('pwd2').value) {
        document.getElementById('pwd1').style.color = 'green';
        // document.getElementById('message').innerHTML = 'matching';
    } else {
        document.getElementById('pwd1').style.color = 'red';
        // document.getElementById('message').innerHTML = 'not matching';
    }
}



//----------------------------------------------------------- CREATING THE SWITCH EFFECT ON THE PAGE------------------------

// ------------------------------- PAGE 1 -------------------------------------------
function pgn1() {
    var pg1 = document.getElementById("page1");
    var pg2 = document.getElementById("page2");
    pg1.style.display = "none";
    pg2.style.display = "block";
}


// -------------------------------------- PAGE 2 ---------------------------------------------
function pgp2() {
    var pg1 = document.getElementById("page1");
    var pg2 = document.getElementById("page2");
    pg1.style.display = "block";
    pg2.style.display = "none";
}

function pgn2() {
    var pg3 = document.getElementById("page3");
    var pg2 = document.getElementById("page2");
    pg2.style.display = "none";
    pg3.style.display = "block";
}


// -------------------------------------------- PAGE 3 -----------------------------------------------------
function pgp3() {
    var pg3 = document.getElementById("page3");
    var pg2 = document.getElementById("page2");
    pg2.style.display = "block";
    pg3.style.display = "none";
}

function pgn3() {
    var pg4 = document.getElementById("page4");
    var pg3 = document.getElementById("page3");
    pg3.style.display = "none";
    pg4.style.display = "block";
}


// ------------------------------------------- PAGE 4 -----------------------------------------------------------
function pgp4() {
    var pg3 = document.getElementById("page3");
    var pg4 = document.getElementById("page4");
    pg4.style.display = "none";
    pg3.style.display = "block";
}

function pgn4() {
    var pg4 = document.getElementById("page4");
    var pg5 = document.getElementById("page5");
    pg4.style.display = "none";
    pg5.style.display = "block";
}


// ------------------------------------------- PAGE 5 -----------------------------------------------------------
function pgp5() {
    var pg5 = document.getElementById("page5");
    var pg4 = document.getElementById("page4");
    pg5.style.display = "none";
    pg4.style.display = "block";
}

function pgn5() {
    var pg6 = document.getElementById("page6");
    var pg5 = document.getElementById("page5");
    pg5.style.display = "none";
    pg6.style.display = "block";
}


// ------------------------------------------- PAGE 6 -----------------------------------------------------------
function pgp6() {
    var pg5 = document.getElementById("page5");
    var pg6 = document.getElementById("page6");
    pg6.style.display = "none";
    pg5.style.display = "block";
}



// -------------------------- PLACE FILTER PAGE 2 ------------------------------------------------------------
function pgf1() {
    var pg1 = document.getElementById("pagepl1");
    var pg2 = document.getElementById("pagepl2");
    pg1.style.display = "none";
    pg2.style.display = "block";
}

function pgf2() {
    var pg1 = document.getElementById("pagepl1");
    var pg2 = document.getElementById("pagepl2");
    pg1.style.display = "block";
    pg2.style.display = "none";
}


// -------------------------- TYPE FILTER PAGE 2 ------------------------------------------------------------
function pgt1() {
    var pg1 = document.getElementById("paget1");
    var pg2 = document.getElementById("paget2");
    pg1.style.display = "none";
    pg2.style.display = "block";
}

function pgt2() {
    var pg1 = document.getElementById("paget1");
    var pg2 = document.getElementById("paget2");
    pg1.style.display = "block";
    pg2.style.display = "none";
}

// -------------------------- PRICE FILTERs PAGE  ------------------------------------------------------------
// ------------------------NEXT PAGES FIRST ------------------------------------------------

function pgpn1() {
    var pg1 = document.getElementById("pagep1");
    var pg2 = document.getElementById("pagep2");
    pg1.style.display = "none";
    pg2.style.display = "block";
}

function pgpn2() {
    var pg3 = document.getElementById("pagep3");
    var pg2 = document.getElementById("pagep2");
    pg3.style.display = "block";
    pg2.style.display = "none";
}

// -------------------------- WISHLIST PAGES ------------------------------------------------------------
function pgs1() {
    var pg1 = document.getElementById("save1");
    var pg2 = document.getElementById("save2");
    pg1.style.display = "none";
    pg2.style.display = "block";
}

function pgs2() {
    var pg1 = document.getElementById("save1");
    var pg2 = document.getElementById("save2");
    pg1.style.display = "block";
    pg2.style.display = "none";
}