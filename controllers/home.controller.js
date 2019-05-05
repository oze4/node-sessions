const express = require('express');
const router = express.Router();
const middleware = require('../utils/middleware.js');
const session = require('express-session');
const config = require('../config/config.js')


router.use(session({
    key: 'user_sid',
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600 //600000
    }
}));

router.get('/', middleware.sessionChecker, (req, res) => {
    res.redirect('/login');
});




module.exports = router;