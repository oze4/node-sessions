const express          = require('express');
const router           = express.Router();
const bodyParser       = require('body-parser');
const cookieParser     = require('cookie-parser');
const middleware       = require('../utils/middleware.js');
const { sessionStore } = require('../utils/session.js');
const User             = require('../models/user.js');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());



// GET REQUESTS ------------------------------------------------
router.get('/signup', middleware.sessionChecker, (req, res) => {
    res.render('../views/signup.hbs');
});


router.get('/login', [middleware.sessionChecker, middleware.logHeaders], (req, res) => {
    if(req.headers['x-logged-out'] === "1") {
        res.render('../views/login.hbs', {
            loggedout: "Successfully logged out!"
        });
    } else {
        res.render('../views/login.hbs');
    }
})


router.get('/logout', middleware.logHeaders, (req, res) => {
    sessionStore.destroy(req.session.id).then(() => {
        req.session = null; // have to set req.session to null
        req.header('x-logged-out', "1");
        res.redirect('/login');
    }).catch((err) => {
        res.render('../views/login.hbs', { err: err })
    })
})


router.get('/dashboard', middleware.logHeaders, (req, res) => {

    sessionStore.get(req.session.id).then((sesh) => {
        res.render('../views/dashboard.hbs', { user: sesh.user });
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
        res.render('../views/signup.hbs', { err: error })
    });
})


router.post('/login', middleware.logHeaders, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username }, (err, user) => {
        if (err) {
            res.render('../views/login.hbs', { err: err });
        } else if (user) {
            if (user.validPassword(password)) {
                req.session.user = user;
                res.redirect('/dashboard');
            } else {
                res.render('../views/login.hbs', { err: "Username or Password invalid!" });
            }
        } else {
            res.render('../views/login.hbs', { err: "Username or Password not valid!" });
        }
    })
})
//end POST REQUESTS ------------------------------------------



module.exports = router;
