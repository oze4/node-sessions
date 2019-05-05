const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const config = require('./config/config.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const middleware = require('./utils/middleware.js');


router.use(session({
    key: 'user_sid',
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 //600000
    }
}));


router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());
//router.use(middleware.cookieChecker);


module.exports = router;