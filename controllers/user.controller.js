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


router.get('/login', middleware.sessionChecker, (req, res) => {
    res.render('../views/login.hbs');
})


router.get('/logout', (req, res) => {
    sessionStore.destroy(req.session.id).then(() => {
        res.redirect('/login');
    }).catch((err) => {
        res.render('../views/login.hbs', { err: err })
    })
})


router.get('/dashboard', (req, res) => {
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


router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username }, (err, user) => {
        if (err) {
            res.render('../views/login.hbs', { err: err });
        } else if (user) {
            console.log("------------ req.session ------------")
            console.log(req)
            console.log("---------- end req.session ----------")
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
