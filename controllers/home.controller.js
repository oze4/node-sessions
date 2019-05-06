const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const middleware = require('../utils/middleware.js');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());


router.get('/', middleware.sessionChecker, (req, res) => {
    res.redirect('/login');
});


module.exports = router;