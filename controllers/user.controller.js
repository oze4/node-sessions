const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const middleware = require('../utils/middleware.js');
const { sessionStore } = require('../utils/session.js');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());

// database model
const User = require('../models/user.js');




// GET REQUESTS ------------------------------------------------
router.get('/signup', middleware.sessionChecker, (req, res) => {
    res.render('../views/signup.ejs');
});


router.get('/login', middleware.sessionChecker, (req, res) => {
    res.render('../views/login.ejs');
})


router.get('/logout', (req, res) => {
    sessionStore.destroy(req.session.id).then(() => {
        res.redirect('/login');
    }).catch((err) => {
        res.render('../views/login.ejs', { err: err })
    })
})


router.get('/dashboard', (req, res) => {
    sessionStore.get(req.session.id).then((sesh) => {
        res.render('../views/dashboard.ejs', { user: sesh.user });
    }).catch((err) => {
        res.redirect('/login');
    })
});
// end GET REQUESTS --------------------------------------------




// POST REQUESTS -----------------------------------------------
router.post('/signup', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(user => {
        req.session.user = user;
        res.redirect('/dashboard');
    }).catch(error => {
        res.render('../views/signup.ejs', { err: error })
    });
})


router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username }, (err, user) => {
        if (err) {
            res.render('../views/login.ejs', { err: err });
        } else if (user) {
            if (user.validPassword(password)) {
                req.session.user = user;
                res.redirect('/dashboard');
            } else {
                res.render('../views/login.ejs', { err: "Username or Password invalid!" });
            }
        } else {
            res.render('../views/login.ejs', { err: "Username or Password not valid!" });
        }
    })
})
//end POST REQUESTS ------------------------------------------




module.exports = router;