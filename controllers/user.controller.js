const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const config = require('../utils/config.js');
const cookieParser = require('cookie-parser');
const middleware = require('../utils/middleware.js');
const path = require('path');

const User = require('../models/user.js');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());



router.get('/signup', middleware.sessionChecker, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/signup.html'));
});


router.get('/login', middleware.sessionChecker, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/login.html'));
})


router.get('/logout', (req, res) => {
    try {
        if (req.session.user && req.cookies.user_sid) {
            res.clearCookie('user_sid');
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    } catch {
        res.redirect('/login');
    }
})


router.get('/dashboard', (req, res) => {
    try {
        if (req.session.user && req.cookies.user_sid) {
            res.sendFile(path.resolve(__dirname, '../public/dashboard.html'));
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        res.redirect('/login');
    }
});




router.post('/signup', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(user => {
            req.session.user = user;
            res.redirect('/dashboard');
        })
        .catch(error => {
            res.redirect('/signup');
        });
})


router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username }, (err, user) => {
        if (!user) {
            res.redirect('/login');
        } else if (!user.validPassword(password)) {
            res.redirect('/login');
        } else {
            req.session.user = user;
            res.redirect('/dashboard');
        }
    });
})



module.exports = router;