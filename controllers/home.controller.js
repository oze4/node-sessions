const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const middleware = require('../utils/middleware.js');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());




// GET REQUESTS ----------------------------------------------
router.get('/', middleware.sessionChecker, (req, res) => {
    res.redirect('/login');
});
//end GET REQUESTS -------------------------------------------




module.exports = router;